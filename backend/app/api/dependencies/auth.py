from typing import Annotated

from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND

from app.core.config import settings
from app.core.security.jwt import verify_token
from app.core.types import Action, Permission, Role
from app.api.dependencies.services import ServiceDependency
from app.models.user import User
from app.schemas.user.user import UserInSession
from app.services.user import UserService


# Handler of protected endpoints.
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f'{settings.domain.api_version}/login/access-token'
)

# User service manager for login and authentication.
Service = Annotated[UserService, Depends(ServiceDependency(UserService))]


def get_current_user(
    service: Service, token: Annotated[str, Security(oauth2_scheme)]
) -> User:
    '''Retrieve a user by the given token.

    Args:
        service (Service): Service with initialized database session.
        token (str): User token to be retrieve.

    Raises:
        HTTPException: HTTP 401. Credentials are not valid.
        HTTPException: HTTP 404. User cannot be retrieved.

    Returns:
        User: User retrieved from token.
    '''
    if not (payload := verify_token(token)):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='No se puede validar las credenciales',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    user_id: int = (
        int(payload.sub) if payload.sub and isinstance(payload.sub, (int, str)) else 0
    )

    if not (user := service.get(user_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='Usuario no encontrado',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    return user


# Handler for the current user dependency
CurrentUser = Annotated[User, Security(get_current_user)]


def get_current_active_user(current_user: CurrentUser, service: Service) -> User:
    '''Check if the current user is active and returns it.
    Otherwise raise an exception.

    Args:
        current_user (CurrentUser): Get the current user in the system.
        service (Service): Service with initialized database session.

    Raises:
        HTTPException: HTTP 403. User isn't active.

    Returns:
        User: Current user.
    '''
    if not service.is_active(current_user):
        raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail='Usuario inactivo')

    return current_user


# Handler for the current active user dependency
CurrentActiveUser = Annotated[User, Security(get_current_active_user)]


class CurrentUserWithRole:
    '''Check if the current active user has a role and returns it.
    Otherwise raise an exception.

    Args:
        role (str): Role to check on the current active user.

    Raises:
        HTTPException: HTTP 403. Unauthorized user.
    '''

    def __init__(self, role: Role):
        '''Check if the current active user has a role and returns it.
        Otherwise raise an exception.

            Args:
                role (str): Role to check on the current active user.
        '''
        self._role = role

    def __call__(self, *, current_user: CurrentActiveUser) -> User:
        '''Check if the current active user has a role and returns it.
        Otherwise raise an exception.

            Args:
                current_user (CurrentActiveUser): Dependency to get the current
                active user.

            Raises:
                HTTPException: HTTP 403. Unauthorized user.

            Returns:
                User: Current active user.
        '''
        if self._role != current_user.role.name:
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN,
                detail=f'El usuario {current_user.username} no tiene '
                + 'los permisos suficientes',
            )

        return current_user


class CurrentUserWithPermissions:
    '''Check if the current active user has a permission ans its
    actions and returns it. Otherwise raise an exception.

    Args:
        permission (str): Permission to check on the current active user.
        actions (set[PermissionAction]): Permission actions to be checked
        on the current active user.

    Raises:
        HTTPException: HTTP 403. Unauthorized user.
    '''

    def __init__(self, permission: Permission, actions: set[Action]):
        '''Check if the current active user has a permission ans its
        actions and returns it. Otherwise raise an exception.

        Args:
            permission (str): Permission to check on the current active user.
            actions (set[PermissionAction]): Permission actions to be checked
            on the current active user.
        '''
        self._permission = permission
        self._actions = actions

    def __call__(self, *, current_user: CurrentActiveUser) -> User:
        '''Check if the current user has a permission ans its
        actions and returns it. Otherwise raise an exception.

        Args:
            current_user (CurrentActiveUser): Dependency to get the current
            active user.

        Raises:
            HTTPException: HTTP 403. Unauthorized user.

            Returns:
                User: Current active user.
        '''
        user = UserInSession.from_orm(current_user)
        permissions = user.permissions or {}
        user_actions = set(permissions.get(self._permission, {})) | self._actions

        if self._permission not in permissions or len(user_actions) != len(
            permissions.get(self._permission, [])
        ):
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN,
                detail='El usuario no tiene los permisos necesarios',
            )

        return current_user


def get_current_active_superuser(
    current_user: CurrentActiveUser, service: Service
) -> User:
    '''Check if the current user is a superuser and returns it.
    Otherwise raise an exception.

    Args:
        current_user (CurrentActiveUser): Get the current user in the system.
        service (UserService): Service with initialized database session.

    Raises:
        HTTPException: HTTP 403. User isn't a superuser.

    Returns:
        User: Current user.
    '''
    if not service.is_superuser(current_user):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='El usuario no tiene privilegios suficientes',
        )

    return current_user


# Handler for the current active superuser dependency
CurrentActiveSuperUser = Annotated[User, Depends(get_current_active_superuser)]

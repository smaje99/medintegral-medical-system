from typing import Annotated, Callable

from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND

from app.core.config import settings
from app.core.security.jwt import verify_token
from app.core.types import PermissionAction
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
CurrentUser = Annotated[User, Depends(get_current_user)]


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
CurrentActiveUser = Annotated[User, Depends(get_current_active_user)]


def get_current_user_with_role(role: str) -> Callable[[], User]:
    '''Check if the current user has a role and returns it.
    Otherwise raise an exception.

    Args:
        role (str): Role to check on the current user.

    Raises:
        HTTPException: HTTP 403. Unauthorized user.

    Returns:
        Callable[[], User]: Current user.
    '''

    def wrapper(current_user: User = Depends(get_current_active_user)) -> User:
        if role != current_user.role.name:
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN, detail='Usuario no autorizado'
            )

        return current_user

    return wrapper


def get_current_user_with_permissions(
    permission: str, actions: set[PermissionAction]
) -> Callable[[], User]:
    '''Check if the current user has a permission ans its
    actions and returns it. Otherwise raise an exception.

    Args:
        permission (str): Permission to check on the current user.
        actions (set[PermissionAction]): Permission actions to be
        checked on the current user.

    Raises:
        HTTPException: HTTP 403. Unauthorized user.

    Returns:
        Callable[[], User]: Current user.
    '''

    def wrapper(current_user: User = Depends(get_current_active_user)) -> User:
        user = UserInSession.from_orm(current_user)
        permissions = user.permissions or {}
        user_actions = set(permissions.get(permission, {})) | actions

        if permission not in permissions or len(user_actions) != len(
            permissions.get(permission, [])
        ):
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN,
                detail='El usuario no tiene los permisos necesarios',
            )

        return current_user

    return wrapper


def get_current_active_superuser(
    current_user: CurrentActiveUser, service: Service
) -> User:
    '''Check if the current user is a superuser and returns it.
    Otherwise raise an exception.

    Args:
        current_user (User): Get the current user in the system.
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

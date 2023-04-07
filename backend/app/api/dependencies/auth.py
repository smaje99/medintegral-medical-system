from typing import Annotated, Callable

from fastapi import Depends, HTTPException
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
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f'{settings.domain.api_version}/login/access-token'
)

# User service manager for login and authentication.
get_service = ServiceDependency(UserService)


def get_current_user(
    service: UserService = Depends(get_service), token: str = Depends(reusable_oauth2)
) -> User:
    '''Retrieve a user by the given token.

    Args:
        service (UserService, optional): Service with initialized database session.
        token (str, optional): User token to be retrieve.

    Raises:
        HTTPException: HTTP 403. Credentials are not valid.
        HTTPException: HTTP 404. User cannot be retrieved.

    Returns:
        User: User retrieved from token.
    '''
    if not (payload := verify_token(token)):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='No se puede validar las credenciales',
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not (user := service.get(id=payload.sub)):  # type: ignore
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='Usuario no encontrado',
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(get_service),
) -> User:
    '''Check if the current user is active and returns it.
    Otherwise raise an exception.

    Args:
        current_user (User): Get the current user in the system.
        service (UserService): Service with initialized database session.

    Raises:
        HTTPException: User isn't active.

    Returns:
        User: Current user.
    '''
    if not service.is_active(current_user):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail='Usuario inactivo')

    return current_user


def get_current_user_with_role(role: str) -> Callable[[], User]:
    '''Check if the current user has a role and returns it.
    Otherwise raise an exception.

    Args:
        role (str): Role to check on the current user.

    Raises:
        HTTPException: HTTP 401. Unauthorized user.

    Returns:
        Callable[[], User]: Current user.
    '''

    def wrapper(current_user: User = Depends(get_current_active_user)) -> User:
        if role != current_user.role.name:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED, detail='Usuario no autorizado'
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
    current_user: User = Depends(get_current_active_user),
    service: UserService = Depends(get_service),
) -> User:
    '''Check if the current user is a superuser and returns it.
    Otherwise raise an exception.

    Args:
        current_user (User): Get the current user in the system.
        service (UserService): Service with initialized database session.

    Raises:
        HTTPException: User isn't a superuser.

    Returns:
        User: Current user.
    '''
    if not service.is_superuser(current_user):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='El usuario no tiene privilegios suficientes',
        )

    return current_user


CurrentUser = Annotated[User, Depends(get_current_user)]

CurrentActiveUser = Annotated[User, Depends(get_current_active_user)]

CurrentActiveSuperUser = Annotated[User, Depends(get_current_active_superuser)]

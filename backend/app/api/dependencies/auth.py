from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from starlette.status import (
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND
)

from app.core.config import settings
from app.core.security.jwt import verify_token
from app.api.dependencies.services import ServiceDependency
from app.models.user import User
from app.services.user import UserService


# Handler of protected endpoints.
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f'{settings.domain.api_version}/login/access-token'
)

# User service manager for login and authentication.
get_service = ServiceDependency(UserService)


def get_current_user(
    service: UserService = Depends(get_service),
    token: str = Depends(reusable_oauth2)
) -> User:
    '''Retrieve a user by the given token.

    Args:
        service (UserService, optional): Service with initialized
        database session.
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
            headers={"WWW-Authenticate": "Bearer"}
        )

    if not (user := service.get(id=payload.sub)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='Usuario no encontrado',
            headers={"WWW-Authenticate": "Bearer"}
        )

    return user


def get_current_active_user(
    current_user: User = Depends(get_current_user),
    service: UserService = Depends(get_service)
) -> User:
    '''Check if a user is active and returns it.
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
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='Usuario inactivo'
        )

    return current_user

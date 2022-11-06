from typing import Any

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from fastapi.security import OAuth2PasswordRequestForm
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED
)

from app.api.dependencies.auth import get_current_user
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.jwt import create_access_token
from app.models.user import User as UserModel
from app.schemas.user.token import Token, TokenPayloadIn
from app.schemas.user.user import User
from app.services.user import UserService

from .login_deps import get_service


router = APIRouter()


@router.post('/login/access-token', response_model=Token)
def login(
    service: UserService = Depends(get_service),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    '''OAuth2 compatible token login.

    Authenticate a user's credentials for logging
    into the system using a token.

    Args:
    * service (UserService): Service with initialized database session.
    * form_data (OAuth2PasswordRequestForm): User's credentials.

    Raises:
    * HTTPException: HTTP 400. Incorrect credentials.
    * HTTPException: HTTP 401. User isn't active.
    * HTTPException: HTTP 403. Credentials aren't valid.
    * HTTPException: HTTP 404. User not found.

    Returns:
    * Token: Access Token.
    '''
    try:
        user = service.authenticate(
            username=form_data.username,
            password=form_data.password
        )
    except IncorrectCredentialsException as error:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=str(error),
            headers={'WWW-Authenticate': 'Bearer'}
        ) from error

    if not service.is_active(user):  # type: ignore
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='Usuario inactivo',
            headers={'WWW-Authenticate': 'Bearer'}
        )

    return Token(
        access_token=create_access_token(
            TokenPayloadIn(sub=user.dni)  # type: ignore
        ),
        token_type='bearer'
    )


@router.post('/login/test-token', response_model=User)
def test_token(current_user: UserModel = Depends(get_current_user)) -> Any:
    '''Test access token of a user.

    Args:
        current_user (UserModel): Get the current user in the system.

    Returns:
        User: Current user.
    '''
    return current_user

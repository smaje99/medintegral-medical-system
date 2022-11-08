from typing import Any

from fastapi import (
    APIRouter,
    Body,
    Depends,
    HTTPException,
    Path
)
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND
)

from app.api.dependencies.auth import get_current_user
from app.core.email import send_reset_password_email
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.jwt import (
    create_access_token,
    generate_password_reset_token,
    verify_password_reset_token
)
from app.models.user import User as UserModel
from app.schemas.common.message import Message
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


@router.post('/password-recovery/{email}', response_model=Message)
def recover_password(
    email: EmailStr = Path(...),
    service: UserService = Depends(get_service)
) -> Any:
    '''Password recovery via user's email.

    Args:
    * email (EmailStr): User's email via path parameter.

    Returns:
    * Message: Info message.
    '''
    if not (user := service.get_by_email(email)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El usuario con este correo electrónico no existe'
        )

    password_reset_token = generate_password_reset_token(email=email)
    send_reset_password_email(
        email_to=user.person.email,  # type: ignore
        username=user.username,
        token=password_reset_token
    )

    return Message(
        message='Se envío el correo electrónico para recuperar la contraseña'
    )


@router.patch('/reset-password', response_model=Message)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    service: UserService = Depends(get_service)
) -> Any:
    '''Reset an user's password.

    Args:
    * token (str): Token to reset password.
    * new_password (str): New user's password.

    Raises:
    * HTTPException: HTTP 403. Token invalid.
    * HTTPException: HTTP 404. User not found.
    * HTTPException: HTTP 401. User invalid.

    Returns:
    * Message: Info message.
    '''
    if not (email := verify_password_reset_token(token)):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='Token invalido'
        )

    if not (user := service.get_by_email(email)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El usuario con este correo electrónico no existe'
        )

    if not service.is_active(user):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail='El usuario con este correo electrónico está inactivo'
        )

    service.update_password(db_user=user, new_password=new_password)

    return Message(
        message='Contraseña actualizada correctamente'
    )

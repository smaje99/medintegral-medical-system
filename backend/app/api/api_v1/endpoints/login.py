from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Path
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr, SecretStr
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
)

from app.api.dependencies.auth import CurrentUser
from app.api.dependencies.services import ServiceDependency
from app.core.email import send_reset_password_email
from app.core.exceptions import IncorrectCredentialsException
from app.core.security.jwt import (
    create_access_token,
    generate_password_reset_token,
    verify_password_reset_token,
)
from app.schemas.common.message import Message
from app.schemas.user.token import Token, TokenPayloadIn
from app.schemas.user.user import UserInSession
from app.services.user import UserService


router = APIRouter()

UserServiceDependency = Annotated[UserService, Depends(ServiceDependency(UserService))]


@router.post('/login/access-token')
def login(
    service: UserServiceDependency,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    '''OAuth2 compatible token login.

    Authenticate a user's credentials for logging
    into the system using a token.

    Raises:
    * HTTPException: HTTP 400. Incorrect credentials.
    * HTTPException: HTTP 403. User isn't active.
    * HTTPException: HTTP 403. Credentials aren't valid.
    * HTTPException: HTTP 404. User not found.

    Returns:
    * Token: Access Token.
    '''
    try:
        user = service.authenticate(
            username=form_data.username, password=SecretStr(form_data.password)
        )
    except IncorrectCredentialsException as error:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=str(error),
            headers={'WWW-Authenticate': 'Bearer'},
        ) from error

    if not service.is_active(user):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='Usuario inactivo',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    sub = str(user.dni)
    token = TokenPayloadIn(sub=sub)
    access_token = create_access_token(token)

    return Token(access_token=access_token, token_type='bearer')


@router.post('/login/test-token')
def test_token(current_user: CurrentUser) -> UserInSession:
    '''Test access token of a user.

    Returns:
        User: Current user.
    '''
    return current_user  # type: ignore


@router.post('/password-recovery/{email}')
def recover_password(
    email: Annotated[EmailStr, Path()],
    service: UserServiceDependency,
) -> Message:
    '''Password recovery via user's email.

    Args:
    * email (EmailStr): User's email via path parameter.

    Raise:
    * HTTPException. HTTP Error 404. User not found.
    * HTTPException. HTTP Error 403. User inactive.

    Returns:
    * Message: Info message.
    '''
    if not (user := service.get_by_email(email)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El usuario con este correo electrónico no existe',
        )

    if not service.is_active(user):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail=f'El usuario {user.username} está inactivo',
        )

    password_reset_token = generate_password_reset_token(email=email)
    send_reset_password_email(
        email_to=user.person.email,
        username=user.username or '',
        token=password_reset_token,
    )

    return Message(message='Se envío el correo electrónico para recuperar la contraseña')


@router.patch('/reset-password')
def reset_password(
    token: Annotated[str, Body()],
    new_password: Annotated[SecretStr, Body(alias='newPassword')],
    service: UserServiceDependency,
) -> Message:
    '''Reset an user's password.

    Args:
    * token (str): Token to reset password.
    * newPassword (str): New user's password.

    Raises:
    * HTTPException: HTTP 401. Token invalid.
    * HTTPException: HTTP 404. User not found.
    * HTTPException: HTTP 403. User invalid.

    Returns:
    * Message: Info message.
    '''
    if not (email := verify_password_reset_token(token)):
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail='Token invalido')

    if not (user := service.get_by_email(email)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El usuario con este correo electrónico no existe',
        )

    if not service.is_active(user):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN,
            detail='El usuario con este correo electrónico está inactivo',
        )

    service.reset_password(db_user=user, new_password=new_password)

    return Message(message='Contraseña actualizada correctamente')

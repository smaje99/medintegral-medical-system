from datetime import datetime, timedelta, timezone
from typing import Any

from jose import jwt, JWTError
from pydantic import ValidationError

from app.core.config import settings
from app.schemas.user.token import TokenPayload, TokenPayloadIn


def create_access_token(
    subject: TokenPayloadIn, expires_delta: timedelta | None = None
) -> str:
    '''Create a new JWT encode access token for the given subject.

    Args:
        subject (TokenIn): Data to encode by the token.
        expires_delta (timedelta | None, optional): Access token expiration.
        Defaults to None.

    Returns:
        str: JWT token.
    '''
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.security.jwt.access_token_expire_minutes
        )

    payload = subject.dict().copy()
    payload['exp'] = expire.timestamp()

    return jwt.encode(
        payload,
        settings.security.jwt.secret_key,
        algorithm=settings.security.jwt.algorithm
    )


def verify_token(token: str) -> TokenPayload | None:
    '''Verify a JWT token.

    Args:
        token (str): The token to verify.

    Returns:
        TokenPayload | None: Token payload data.
    '''
    try:
        payload: dict[str, Any] = jwt.decode(
            token,
            settings.security.jwt.secret_key,
            algorithms=[settings.security.jwt.algorithm]
        )

        return TokenPayload(**payload)
    except (JWTError, ValidationError):
        return None


def generate_password_reset_token(email: str) -> str:
    '''Generate a new JWT encoded for password reset token.

    Args:
        email (str): Data to encode.

    Returns:
        str: JWT password reset token.
    '''
    delta = timedelta(hours=settings.email.reset_token_expire_hours)
    now = datetime.now(timezone.utc)
    expires = now + delta
    exp = expires.timestamp()

    return jwt.encode(
        {'exp': exp, 'nbf': now, 'sub': email},
        settings.security.jwt.secret_key,
        algorithm=settings.security.jwt.algorithm
    )


def verify_password_reset_token(token: str) -> str | None:
    '''Verify a JWT password reset token.

    Args:
        token (str): the token to verify.

    Returns:
        str | None: Token subject.
    '''
    try:
        decoded_token = jwt.decode(
            token,
            settings.security.jwt.secret_key,
            algorithms=[settings.security.jwt.algorithm]
        )

        return decoded_token.get('sub')
    except JWTError:
        return None

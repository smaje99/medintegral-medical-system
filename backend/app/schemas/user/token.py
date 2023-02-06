from datetime import datetime, timezone
from uuid import UUID

from fastapi_camelcase import CamelModel
from pydantic import Field, validator


class Token(CamelModel):
    '''Token properties.'''

    access_token: str
    token_type: str


class TokenPayloadBase(CamelModel):
    '''Shared properties.'''

    iat: float


class TokenPayload(TokenPayloadBase):
    '''Properties to receive in token.'''

    sub: str | int | UUID | None
    exp: float | None = None

    @validator('sub', pre=True)
    def cast_sub(cls, value: str | UUID) -> str | int | UUID:  # pylint: disable=C0116, E0213
        return int(value) if isinstance(value, str) and value.isnumeric() else value


class TokenPayloadIn(TokenPayloadBase):
    '''Properties to receive on creation.'''

    sub: str | UUID | None = None
    iat: float = Field(default=datetime.now(timezone.utc).timestamp())

    @validator('sub', pre=True)
    def cast_sub(cls, value: str | int | UUID) -> str | UUID:  # pylint: disable=C0116, E0213
        return str(value) if isinstance(value, int) else value

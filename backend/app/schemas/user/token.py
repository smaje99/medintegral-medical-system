from datetime import datetime, timezone
from uuid import UUID

from pydantic import BaseModel, Field, validator


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayloadBase(BaseModel):
    iat: float


class TokenPayload(TokenPayloadBase):
    sub: str | int | UUID | None
    exp: float | None = None

    @validator('sub', pre=True)
    def cast_sub(cls, v: str | UUID) -> str | int | UUID:
        return int(v) if isinstance(v, str) and v.isnumeric() else v


class TokenPayloadIn(TokenPayloadBase):
    sub: str | UUID | None = None
    iat: float = Field(default=datetime.now(timezone.utc).timestamp())

    @validator('sub', pre=True)
    def cast_sub(cls, v: str | int | UUID) -> str | UUID:
        return str(v) if isinstance(v, int) else v

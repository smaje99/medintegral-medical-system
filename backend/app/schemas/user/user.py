from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, validator

from app.core.types import PermissionAction
from app.schemas.person.person import PersonInUser
from app.schemas.user.permission import PermissionInUser
from app.schemas.user.role import Role


class UserBase(BaseModel):
    ''' Shared properties. '''
    dni: int | None = None


class UserCreate(UserBase):
    ''' Properties to receive via API on creation. '''
    dni: int
    password: str
    role_id: UUID


class UserUpdate(UserBase):
    ''' Properties to receive via API on update. '''
    password: str | None = None
    role_id: UUID | None = None


class UserInDBBase(UserBase):
    ''' Shared properties by model stored in database. '''
    dni: int
    username: str
    is_active: bool
    created_at: datetime
    modified_at: datetime

    class Config:  # pylint: disable=missing-class-docstring
        orm_mode = True


class User(UserInDBBase):
    ''' Additional properties to return via API. '''
    role: str
    person: PersonInUser
    permissions: dict[str, list[PermissionAction]] | None

    @validator('permissions', pre=True)
    def get_permissions(  # pylint: disable=C0116, E0213
        cls, value: list[PermissionInUser]
    ) -> dict[str, list[PermissionAction]]:
        return {p.name: p.actions for p in value}

    @validator('role', pre=True)
    def get_role(cls, value: Role) -> str:  # pylint: disable=C0116, E0213
        return value.name


class UserInDB(UserInDBBase):
    ''' Additional properties stored in the database. '''
    hashed_password: str

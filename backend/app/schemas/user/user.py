from datetime import datetime
from uuid import UUID

from fastapi_camelcase import CamelModel
from pydantic import SecretStr, validator

from app.core.types import Action
from app.schemas.medical.doctor import Doctor
from app.schemas.person.person import Person, PersonInUserSession
from app.schemas.user.permission import PermissionInUser
from app.schemas.user.role import Role


class UserBase(CamelModel):
    '''Shared properties.'''


class UserCreate(UserBase):
    '''Properties to receive via API on creation.'''

    dni: int
    password: SecretStr
    role_id: UUID


class UserUpdate(UserBase):
    '''Properties to receive via API on update.'''

    role_id: UUID | None = None


class UserUpdatePassword(UserBase):
    '''Properties to receive via API to update the user's password.'''

    old_password: SecretStr
    new_password: SecretStr


class UserInDBBase(UserBase):
    '''Shared properties by model stored in database.'''

    dni: int
    username: str
    is_superuser: bool
    is_active: bool
    created_at: datetime
    modified_at: datetime

    class Config:  # pylint: disable=C0115
        orm_mode = True


class User(UserInDBBase):
    '''Additional properties to return via API.'''

    role: Role
    person: Person
    doctor: Doctor | None = None


class UserInDB(UserInDBBase):
    '''Additional properties stored in the database.'''

    hashed_password: str


class UserInSession(UserInDBBase):
    '''Additional properties for user session and returning via API.'''

    role: str
    person: PersonInUserSession
    permissions: dict[str, list[Action]] | None

    @validator('permissions', pre=True)
    def get_permissions(  # pylint: disable=C0116, E0213
        cls, value: list[PermissionInUser]
    ) -> dict[str, list[Action]]:
        return {p.name: p.actions for p in value}

    @validator('role', pre=True)
    def get_role(cls, value: Role) -> str:  # pylint: disable=C0116, E0213
        return value.name

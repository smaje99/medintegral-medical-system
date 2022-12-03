from uuid import UUID

from pydantic import BaseModel

from app.schemas.person.person import PersonInUser
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
    dni: int  # type: ignore
    username: str
    is_active: bool

    class Config:  # pylint: disable=missing-class-docstring
        orm_mode = True


class User(UserInDBBase):
    ''' Additional properties to return via API. '''
    person: PersonInUser
    role: Role


class UserInDB(UserInDBBase):
    ''' Additional properties stored in the database. '''
    hashed_password: str

from pydantic import BaseModel


class UserBase(BaseModel):
    ''' Shared properties. '''
    dni: int | None = None
    username: str | None = None


class UserCreate(UserBase):
    ''' Properties to receive via API on creation. '''
    dni: int
    password: str


class UserUpdate(UserBase):
    ''' Properties to receive via API on update. '''
    password: str | None = None


class UserInDBBase(UserBase):
    ''' Shared properties by model stored in database. '''
    dni: int  # type: ignore

    class Config:  # pylint: disable=missing-class-docstring
        orm_mode = True


class User(UserInDBBase):
    ''' Additional properties to return via API. '''


class UserInDB(UserInDBBase):
    ''' Additional properties stored in the database. '''
    hashed_password: str

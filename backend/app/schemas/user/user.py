from pydantic import BaseModel


# Shared properties
class UserBase(BaseModel):
    dni: int | None = None
    username: str | None = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    dni: int
    password: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: str | None = None


class UserInDBBase(UserBase):
    dni: int  # type: ignore

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in the database
class UserInDB(UserInDBBase):
    hashed_password: str

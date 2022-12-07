from uuid import UUID

from pydantic import BaseModel, validator

from app.core.types import PermissionAction


class PermissionBase(BaseModel):
    ''' Shared properties. '''
    name: str


class PermissionCreate(PermissionBase):
    ''' Properties to receive via API on creation. '''


class PermissionUpdate(PermissionBase):
    ''' Properties to receive via API on update. '''


class PermissionInDBBase(PermissionBase):
    ''' Shared properties by model stored in database. '''
    id: UUID

    class Config:  # pylint: disable=missing-class-docstring
        orm_mode = True


class Permission(PermissionInDBBase):
    ''' Additional properties to return via API. '''


class PermissionInDB(PermissionInDBBase):
    ''' Additional properties stored in the database. '''


class PermissionInUser(BaseModel):
    ''' Properties to return via user API. '''
    name: str
    actions: list[PermissionAction]

    @validator('actions', pre=True)
    def actions_transform(cls, value: list[PermissionAction]):  # pylint: disable=no-self-argument, missing-function-docstring  # noqa: E501
        return list(set(value))

    class Config:  # pylint: disable=missing-class-docstring
        orm_mode = True

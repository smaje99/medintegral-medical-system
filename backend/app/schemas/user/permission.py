from uuid import UUID

from fastapi_camelcase import CamelModel
from pydantic import validator

from app.core.types import Action


class PermissionBase(CamelModel):
    '''Shared properties.'''

    name: str


class PermissionCreate(PermissionBase):
    '''Properties to receive via API on creation.'''


class PermissionUpdate(PermissionBase):
    '''Properties to receive via API on update.'''


class PermissionInDBBase(PermissionBase):
    '''Shared properties by model stored in database.'''

    id: UUID

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Permission(PermissionInDBBase):
    '''Additional properties to return via API.'''


class PermissionInDB(PermissionInDBBase):
    '''Additional properties stored in the database.'''


class PermissionInUser(CamelModel):
    '''Properties to return via user API.'''

    name: str
    actions: list[Action]

    @validator('actions', pre=True)
    def actions_transform(  # pylint: disable=C0116, E0213
        cls, value: list[Action]
    ):
        return list(set(value))

    class Config:  # pylint: disable=C0115
        orm_mode = True

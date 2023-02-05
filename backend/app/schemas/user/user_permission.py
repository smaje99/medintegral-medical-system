from datetime import datetime
from uuid import UUID

from fastapi_camelcase import CamelModel

from app.core.types import PermissionAction


class UserPermissionBase(CamelModel):
    ''' Shared properties. '''
    user_id: int
    permission_id: UUID
    actions: list[PermissionAction]


class UserPermissionCreate(UserPermissionBase):
    ''' Properties to receive via API on creation. '''


class UserPermissionUpdate(UserPermissionBase):
    ''' Properties to receive via API on update. '''
    is_active: bool


class UserPermissionInDBBase(UserPermissionBase):
    ''' Shared properties by model stored in database. '''
    is_active: bool
    created_at: datetime
    modified_at: datetime

    class Config:  # pylint: disable=C0115
        orm_mode = True


class UserPermission(UserPermissionInDBBase):
    ''' Additional properties to return via API. '''


class UserPermissionInDB(UserPermissionInDBBase):
    ''' Additional properties stored in the database. '''

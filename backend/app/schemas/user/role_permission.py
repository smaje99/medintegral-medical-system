from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.core.types import PermissionAction


class RolePermissionBase(BaseModel):
    ''' Shared properties. '''
    role_id: UUID
    permission_id: UUID
    actions: list[PermissionAction]


class RolePermissionCreate(RolePermissionBase):
    ''' Properties to receive via API on creation. '''


class RolePermissionUpdate(RolePermissionBase):
    ''' Properties to receive via API on update. '''
    is_active: bool


class RolePermissionInDBBase(RolePermissionBase):
    ''' Shared properties by model stored in database. '''
    is_active: bool
    created_at: datetime
    modified_at: datetime

    class Config:  # pylint: disable=C0115
        orm_mode = True


class RolePermission(RolePermissionInDBBase):
    ''' Additional properties to return via API. '''


class RolePermissionInDB(RolePermissionInDBBase):
    ''' Additional properties stored in the database. '''

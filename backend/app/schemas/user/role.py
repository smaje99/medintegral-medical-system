from uuid import UUID

from fastapi_camelcase import CamelModel


class RoleBase(CamelModel):
    '''Shared properties.'''

    name: str


class RoleCreate(RoleBase):
    '''Properties to receive via API on creation.'''


class RoleUpdate(RoleBase):
    '''Properties to receive via API on update.'''


class RoleInDBBase(RoleBase):
    '''Shared properties by model stored in database.'''

    id: UUID

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Role(RoleInDBBase):
    '''Additional properties to return via API.'''


class RoleInDB(RoleInDBBase):
    '''Additional properties stored in the database.'''

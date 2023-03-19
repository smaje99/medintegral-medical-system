from uuid import UUID

from fastapi_camelcase import CamelModel


class SpecialtyBase(CamelModel):
    '''Share properties.'''

    image: str | None = None


class SpecialtyCreate(SpecialtyBase):
    '''Properties to received via API on creation.'''

    name: str
    description: str


class SpecialtyUpdate(SpecialtyBase):
    '''Properties to received via API on update.'''

    name: str | None = None
    description: str | None = None


class SpecialtyInDBBase(SpecialtyBase):
    '''Shared properties by model stored in database.'''

    id: UUID
    name: str
    description: str

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Specialty(SpecialtyInDBBase):
    '''Additional properties to return via API.'''


class SpecialtyInDB(SpecialtyInDBBase):
    '''Additional properties stored in the database.'''

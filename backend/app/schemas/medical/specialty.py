from uuid import UUID

from fastapi_camelcase import CamelModel
from pydantic import validator

from app.core.config import settings


class SpecialtyBase(CamelModel):
    '''Share properties.'''

    image: str


class SpecialtyCreate(SpecialtyBase):
    '''Properties to received via API on creation.'''

    name: str
    description: str


class SpecialtyUpdate(SpecialtyBase):
    '''Properties to received via API on update.'''

    name: str | None = None
    description: str | None = None
    image: str | None = None


class SpecialtyInDBBase(SpecialtyBase):
    '''Shared properties by model stored in database.'''

    id: UUID
    name: str
    description: str

    @validator('image', pre=True)
    def assemble_image_with_server_host(  # pylint: disable=E0213, C0116
        cls, value: str
    ) -> str:
        return f'{settings.domain.server_host}/files/{value}'

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Specialty(SpecialtyInDBBase):
    '''Additional properties to return via API.'''


class SpecialtyInDB(SpecialtyInDBBase):
    '''Additional properties stored in the database.'''

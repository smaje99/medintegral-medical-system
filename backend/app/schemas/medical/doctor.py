from app.core.config import settings
from fastapi_camelcase import CamelModel
from pydantic import validator


class DoctorBase(CamelModel):
    '''Share properties.'''


class DoctorCreate(DoctorBase):
    '''Properties to received via API on creation.'''

    dni: int


class DoctorUpdate(DoctorBase):
    '''Properties to received via API on update.'''

    signature: str | None = None


class DoctorInDBBase(DoctorBase):
    '''Shared properties by model stored in database.'''

    dni: int
    signature: str | None = None

    @validator('signature', pre=True)
    def assemble_signature_with_server_host(  # pylint: disable=E0213, C0116
        cls, value: str | None
    ) -> str | None:
        if value is not None:
            return f'{settings.domain.server_host}/files/{value}'
        return None

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Doctor(DoctorInDBBase):
    '''Additional properties to return via API.'''


class DoctorInDB(DoctorInDBBase):
    '''Additional properties stored in the database.'''

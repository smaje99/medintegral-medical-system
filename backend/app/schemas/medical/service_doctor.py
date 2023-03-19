from typing import UUID

from fastapi_camelcase import CamelModel

from app.core.types import ServiceType, Session


class DoctorBase(CamelModel):
    '''Share properties.'''


class DoctorCreate(DoctorBase):
    '''Properties to received via API on creation.'''

    service_id: UUID
    doctor_id: UUID
    service_type: ServiceType
    session: Session
    is_active: bool


class DoctorUpdate(DoctorBase):
    '''Properties to received via API on update.'''

    service_id: UUID | None = None
    doctor_id: UUID | None = None
    service_type: ServiceType | None = None
    session: Session | None = None
    is_active: bool | None = None


class DoctorInDBBase(DoctorBase):
    '''Shared properties by model stored in database.'''

    id: UUID
    service_id: UUID
    doctor_id: UUID
    service_type: ServiceType
    session: Session
    is_active: bool

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Doctor(DoctorInDBBase):
    '''Additional properties to return via API.'''


class DoctorInDB(DoctorInDBBase):
    '''Additional properties stored in the database.'''

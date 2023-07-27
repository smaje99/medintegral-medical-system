from uuid import UUID

from fastapi_camelcase import CamelModel

from app.core.types import ServiceType, Session
from app.schemas.person.person import Person


class ServiceDoctorBase(CamelModel):
    '''Share properties.'''


class ServiceDoctorCreate(ServiceDoctorBase):
    '''Properties to received via API on creation.'''

    service_id: UUID
    doctor_id: int
    service_type: ServiceType
    session: Session


class ServiceDoctorUpdate(ServiceDoctorBase):
    '''Properties to received via API on update.'''

    service_type: ServiceType | None = None
    session: Session | None = None


class ServiceDoctorInDBBase(ServiceDoctorBase):
    '''Shared properties by model stored in database.'''

    id: UUID
    service_id: UUID
    doctor_id: int
    service_type: ServiceType
    session: Session
    is_active: bool

    class Config:  # pylint: disable=C0115
        orm_mode = True


class ServiceDoctor(ServiceDoctorInDBBase):
    '''Additional properties to return via API.'''


class ServiceDoctorInDB(ServiceDoctorInDBBase):
    '''Additional properties stored in the database.'''


class DoctorInService(CamelModel):
    '''ServiceDoctor schema with doctor personal data.
    This schema is used to associate doctors to a medical service.
    '''

    id: UUID
    service_type: ServiceType
    session: Session
    is_active: bool
    person: Person

    class Config:  # pylint: disable=C0115
        orm_mode = True
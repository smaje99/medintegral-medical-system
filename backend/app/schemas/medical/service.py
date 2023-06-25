from uuid import UUID

from fastapi_camelcase import CamelModel


class ServiceBase(CamelModel):
    '''Share properties.'''


class ServiceCreate(ServiceBase):
    '''Properties to received via API on creation.'''

    name: str
    description: str
    cost: float
    duration: int
    specialty_id: UUID


class ServiceUpdate(ServiceBase):
    '''Properties to received via API on update.'''

    name: str | None = None
    description: str | None = None
    cost: float | None = None
    duration: int | None = None
    is_active: bool | None = None
    specialty_id: UUID | None = None


class ServiceInDBBase(ServiceBase):
    '''Shared properties by model stored in database.'''

    id: UUID
    name: str
    description: str
    cost: float
    duration: int
    is_active: bool

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Service(ServiceInDBBase):
    '''Additional properties to return via API.'''


class ServiceInDB(ServiceInDBBase):
    '''Additional properties stored in the database.'''

    specialty_id: UUID

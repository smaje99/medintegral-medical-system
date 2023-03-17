from fastapi_camelcase import CamelModel


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

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Doctor(DoctorInDBBase):
    '''Additional properties to return via API.'''


class DoctorInDB(DoctorInDBBase):
    '''Additional properties stored in the database.'''

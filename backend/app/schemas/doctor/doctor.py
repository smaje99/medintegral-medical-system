from fastapi_camelcase import CamelModel
from pydantic import conlist, constr


MedicalLicensesType = conlist(
    constr(regex=r'RM\s\d{3}-\d{2}'), min_items=1, unique_items=True
)


class DoctorBase(CamelModel):
    '''Share properties.'''


class DoctorCreate(DoctorBase):
    '''Properties to received via API on creation.'''

    dni: int
    medical_licenses: MedicalLicensesType  # type: ignore


class DoctorUpdate(DoctorBase):
    '''Properties to received via API on update.'''

    medical_licenses: MedicalLicensesType | None = None  # type: ignore
    signature: str | None = None


class DoctorInDBBase(DoctorBase):
    '''Shared properties by model stored in database.'''

    dni: int
    medical_licenses: list[str]
    signature: str | None = None

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Doctor(DoctorInDBBase):
    '''Additional properties to return via API.'''


class DoctorInDB(DoctorInDBBase):
    '''Additional properties stored in the database.'''

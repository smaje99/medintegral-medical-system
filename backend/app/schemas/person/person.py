from datetime import date, datetime

from pydantic import BaseModel, EmailStr, validator
from sqlalchemy_utils import PhoneNumber  # pyright: ignore

from app.core.types import BloodType, CivilStatus, DocumentType, Gender, RHFactor


# Shared properties
class PersonBase(BaseModel):
    dni: int
    name: str
    surname: str
    address: str | None = None
    email: EmailStr
    phone: str
    gender: Gender
    birthdate: date
    document_type: DocumentType
    blood_type: BloodType | None = None
    rh_factor: RHFactor | None = None
    ethnicity: str | None = None
    occupation: str | None = None
    civil_status: CivilStatus | None = None


# Properties to receive via API on creation
class PersonCreate(PersonBase):
    pass


# Properties to receive via API on update
class PersonUpdate(PersonBase):
    pass


# properties shared by models stored in the database
class PersonInDBBase(PersonBase):
    created_at: datetime
    modified_at: datetime

    @validator('phone', pre=True)
    def get_phone_number(cls, v: str | PhoneNumber) -> str:
        return v.e164 if isinstance(v, PhoneNumber) else v

    class Config:
        orm_mode = True


# Additional properties to return via API
class Person(PersonInDBBase):
    pass


# Additional properties stored in database
class PersonInDB(PersonInDBBase):
    pass

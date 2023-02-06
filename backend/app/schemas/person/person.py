from datetime import date, datetime

from fastapi_camelcase import CamelModel
from pydantic import EmailStr, validator
from sqlalchemy_utils import PhoneNumber

from app.core.types import BloodType, CivilStatus, DocumentType, Gender, RHFactor


class PersonBase(CamelModel):
    '''Shared properties.'''

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


class PersonCreate(PersonBase):
    '''Properties to receive via API on creation.'''


class PersonUpdate(PersonBase):
    '''Properties to receive via API on update.'''


class PersonInDBBase(PersonBase):
    '''Properties shared by models stored in the database.'''

    created_at: datetime
    modified_at: datetime

    @validator('phone', pre=True)
    def get_phone_number(  # pylint: disable=C0116, E0213
        cls, value: str | PhoneNumber
    ) -> str:
        return value.e164 if isinstance(value, PhoneNumber) else value

    class Config:  # pylint: disable=C0115
        orm_mode = True


class Person(PersonInDBBase):
    '''Additional properties to return via API.'''

    age: str | None

    @validator('age', pre=True)
    def translate_age_into_spanish(  # pylint: disable=C0116, E0213
        cls, value: str
    ) -> str:
        return (
            value.replace('years', 'años')
            .replace('mons', 'meses')
            .replace('days', 'días')
            .replace('year', 'año')
            .replace('mon', 'mes')
            .replace('day', 'día')
        )


class PersonInDB(PersonInDBBase):
    '''Additional properties stored in database.'''


class PersonInUserSession(CamelModel):
    '''Properties to return via user API.'''

    dni: int
    name: str
    surname: str
    email: EmailStr
    phone: str
    gender: Gender
    created_at: datetime
    modified_at: datetime

    @validator('phone', pre=True)
    def get_phone_number(  # pylint: disable=C0116, E0213
        cls, value: str | PhoneNumber
    ) -> str:
        return value.e164 if isinstance(value, PhoneNumber) else value

    class Config:  # pylint: disable=C0115
        orm_mode = True

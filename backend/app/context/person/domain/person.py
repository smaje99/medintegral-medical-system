from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from app.context.person.domain.enums import CivilStatus, DocumentType, Gender
from app.context.person.domain.objects import PersonAge, PersonId


__all__ = ('Person',)


class Person(BaseModel):
  '''Person entity.'''

  dni: PersonId
  name: str
  surname: str
  address: str | None = None
  email: str
  phonenumber: str
  gender: Gender
  birthdate: date
  document_type: DocumentType
  blood_type: str | None = None
  ethnicity: str | None = None
  occupation: str | None = None
  civil_status: CivilStatus | None = None
  age: PersonAge | None = None
  created_at: datetime
  modified_at: datetime

  model_config = ConfigDict(from_attributes=True)

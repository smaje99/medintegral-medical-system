from pydantic import BaseModel

from app.context.person.domain.objects import (
  PersonAddress,
  PersonBirthdate,
  PersonBloodType,
  PersonCivilStatus,
  PersonDocumentType,
  PersonEmail,
  PersonEthnicity,
  PersonGender,
  PersonId,
  PersonName,
  PersonOccupation,
  PersonPhoneNumber,
  PersonRHFactor,
  PersonSurname,
)


__all__ = ('PersonSaveDTO',)


class PersonSaveDTO(BaseModel):
  '''Person create DTO.'''

  dni: PersonId
  name: PersonName
  surname: PersonSurname
  address: PersonAddress | None = None
  email: PersonEmail
  phonenumber: PersonPhoneNumber
  gender: PersonGender
  birthdate: PersonBirthdate
  document_type: PersonDocumentType
  blood_type: PersonBloodType | None = None
  rh_factor: PersonRHFactor | None = None
  ethnicity: PersonEthnicity | None = None
  occupation: PersonOccupation | None = None
  civil_status: PersonCivilStatus | None = None

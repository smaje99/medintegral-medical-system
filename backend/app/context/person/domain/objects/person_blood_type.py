from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import BloodType


__all__ = ('PersonBloodType',)


def validate_person_blood_type(blood_type: BloodType | str) -> BloodType:
  '''Validate person's blood type.

  Args:
      blood_type (BloodType | str): Person's blood type

  Returns:
      BloodType: Validated person's blood type.
  '''
  assert blood_type is not None, 'Grupo sanguíneo de la persona es requerido.'
  assert blood_type in BloodType, 'Grupo sanguíneo de la persona no es válido.'

  return BloodType(blood_type)


PersonBloodType = Annotated[BloodType, BeforeValidator(validate_person_blood_type)]
'''Value object person's blood type.'''

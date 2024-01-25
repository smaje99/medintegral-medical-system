from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import CivilStatus


__all__ = ('PersonGender',)


def validate_person_gender(person_gender: CivilStatus | str) -> CivilStatus:
  '''Validate person's gender.

  Args:
      person_gender (Gender | str): Person's gender

  Returns:
      Gender: Validated person's gender.
  '''
  assert person_gender is not None, 'Genero de la persona es requerido.'
  assert person_gender in CivilStatus, 'Genero de la persona no es válido.'

  return CivilStatus(person_gender)


PersonGender = Annotated[CivilStatus, BeforeValidator(validate_person_gender)]
'''Value object person's gender.'''

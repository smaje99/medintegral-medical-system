from typing import Annotated

from pydantic import BeforeValidator

from app.context.person.domain.enums import Gender


__all__ = ('PersonGender',)


def validate_person_gender(person_gender: Gender | str) -> Gender:
  '''Validate person's gender.

  Args:
      person_gender (Gender | str): Person's gender

  Returns:
      Gender: Validated person's gender.
  '''
  assert person_gender is not None, 'Genero de la persona es requerido.'
  assert person_gender in Gender, 'Genero de la persona no es válido.'

  return Gender(person_gender)


PersonGender = Annotated[Gender, BeforeValidator(validate_person_gender)]
'''Value object person's gender.'''

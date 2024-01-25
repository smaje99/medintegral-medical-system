from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonEthnicity',)


def validate_person_ethnicity(ethnicity: str) -> str:
  '''Validate person's ethnicity.

  Args:
      ethnicity (str): Person's ethnicity.

  Raises:
      AssertionError: If person's ethnicity is not valid.

  Returns:
      str: Validated person's ethnicity.
  '''
  assert ethnicity is not None, 'Etnia de la persona es requerida'
  assert isinstance(ethnicity, str), 'La etnia de la persona debe ser una cadena de texto'
  assert ethnicity.strip(), 'La etnia de la persona no puede estar vacía'

  return ethnicity.strip().capitalize()


PersonEthnicity = Annotated[str, AfterValidator(validate_person_ethnicity)]
'''Value object person's ethnicity.'''

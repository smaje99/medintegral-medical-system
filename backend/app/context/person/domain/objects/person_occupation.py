from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonOccupation',)


def validate_person_occupation(occupation: str) -> str:
  '''Validate person's occupation.

  Args:
      occupation (str): Person's occupation.

  Raises:
      AssertionError: If person's occupation is not valid.

  Returns:
      str: Validated person's occupation.
  '''
  assert occupation is not None, 'Ocupación de la persona es requerida'
  assert isinstance(
    occupation, str
  ), 'Ocupación de la persona debe ser una cadena de texto'
  assert occupation.strip(), 'Ocupación de la persona no puede estar vacía'

  return occupation.strip().capitalize()


PersonOccupation = Annotated[str, AfterValidator(validate_person_occupation)]
'''Value object person's occupation.'''

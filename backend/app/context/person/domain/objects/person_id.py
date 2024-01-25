from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonId',)


def validate_person_id(person_id: str) -> str:
  '''Validate person id.

  Args:
      person_id (str): Person id.

  Returns:
      str: Validated person id.
  '''
  assert person_id is not None, 'Identificación de la persona es requerido'
  assert isinstance(
    person_id, str
  ), 'Identificación de la persona debe ser una cadena de caracteres'
  assert person_id.isdigit(), 'Identificación de la persona debe ser numérica'

  return person_id


PersonId = Annotated[str, AfterValidator(validate_person_id)]
'''Value object person id.'''

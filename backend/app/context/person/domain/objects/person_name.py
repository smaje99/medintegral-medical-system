from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonName',)


def validate_person_name(person_name: str) -> str:
  '''Validate person's name.

  Args:
      person_name (str): Person's name.

  Returns:
      str: Validated person's name.
  '''
  assert person_name is not None, 'Nombre de la persona es requerido'
  assert isinstance(person_name, str), 'Nombre de la persona debe ser una cadena de texto'
  assert len(person_name.strip()) == 0, 'Nombre de la persona no puede estar vacío'

  return person_name


def transform_person_name(person_name: str) -> str:
  '''Transform person's name.

  Args:
      person_name (str): Person's name.

  Returns:
      str: Transformed person's name.
  '''
  return ' '.join(person_name.split()).title()


PersonName = Annotated[
  str, AfterValidator(validate_person_name), AfterValidator(transform_person_name)
]
'''Value object person's name.'''

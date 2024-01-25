from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonSurname',)


def validate_person_surname(person_surname: str) -> str:
  '''Validate person's surname.

  Args:
      person_surname (str): Person's surname.

  Returns:
      str: Validated person's surname.
  '''
  assert person_surname is not None, 'Apellido de la persona es requerido'
  assert isinstance(
    person_surname, str
  ), 'Apellido de la persona debe ser una cadena de texto'
  assert len(person_surname.strip()) == 0, 'Apellido de la persona no puede estar vacío'

  return person_surname


def transform_person_surname(person_surname: str) -> str:
  '''Transform person's surname.

  Args:
      person_surname (str): Person's surname.

  Returns:
      str: Transformed person's surname.
  '''
  return ' '.join(person_surname.split()).title()


PersonSurname = Annotated[
  str, AfterValidator(validate_person_surname), AfterValidator(transform_person_surname)
]
'''Value object person's surname.'''

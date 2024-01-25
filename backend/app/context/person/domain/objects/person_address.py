from typing import Annotated

from pydantic import AfterValidator


__all__ = ('PersonAddress',)


def validate_person_address(person_address: str) -> str:
  '''Validates person's address.

  Args:
      person_address (str): Person's address.

  Returns:
      str: Validated person's address.
  '''
  assert (
    person_address is not None and len(person_address.strip()) > 0
  ), 'Dirección física de la persona es requerida'
  assert isinstance(
    person_address, str
  ), 'La dirección física de la persona debe ser una cadena de texto'

  return person_address


def transform_person_address(person_address: str) -> str:
  '''Transform person's address.

  Args:
      person_address (str): Person's address.

  Returns:
      str: Transformed person's address.
  '''
  return person_address.strip()


PersonAddress = Annotated[
  str, AfterValidator(validate_person_address), AfterValidator(transform_person_address)
]
'''Value object person's address.'''

from typing import Annotated

from phonenumbers import (
  NumberParseException,
  PhoneNumberFormat,
  format_number,
  is_valid_number,
  parse,
)
from pydantic import AfterValidator


__all__ = ('PersonPhoneNumber',)


def validate_and_transform_person_phonenumber(person_phonenumber: str) -> str:
  '''Validate and transform person's phonenumber.

  Args:
      person_phonenumber (str): Person's phonenumber.

  Returns:
      str: Validated and transformed person's phonenumber.
  '''
  assert (
    person_phonenumber is not None and len(person_phonenumber.strip()) > 0
  ), 'Número de celular de la persona es requerido.'

  try:
    phonenumber_parsed = parse(person_phonenumber)
    assert is_valid_number(
      phonenumber_parsed
    ), 'Número de celular de la persona no es válido.'

    return format_number(phonenumber_parsed, PhoneNumberFormat.E164)
  except NumberParseException as error:
    assert not error, 'Número de celular de la persona no es válido.'

    return person_phonenumber


PersonPhoneNumber = Annotated[
  str, AfterValidator(validate_and_transform_person_phonenumber)
]
'''Value object person's phonenumber.'''

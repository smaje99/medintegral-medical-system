from typing import Annotated

from email_validator import EmailNotValidError, validate_email
from pydantic import AfterValidator


__all__ = ('PersonEmail',)


def validate_and_transform_person_email(person_email: str) -> str:
  '''Validate and transform person's email.

  Args:
    person_email (str): person's email.

  Returns:
    str: validated and transformed person's email.
  '''
  assert (
    person_email is not None and len(person_email.strip()) > 0
  ), 'Correo electrónico de la persona es requerido.'

  try:
    email_info = validate_email(person_email.strip(), check_deliverability=False)
    return email_info.email
  except EmailNotValidError as error:
    assert not error, 'Correo electrónico de la persona no es válido.'

    return person_email


PersonEmail = Annotated[str, AfterValidator(validate_and_transform_person_email)]
'''Value object person's email.'''

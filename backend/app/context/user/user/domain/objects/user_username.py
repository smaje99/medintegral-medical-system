from typing import Annotated

from pydantic import AfterValidator


def validate_user_username(username: str) -> str:
  '''Validate user's username.'''
  assert username is not None, 'Nombre de usuario es requerido.'
  assert isinstance(username, str), 'Nombre de usuario debe ser una cadena de texto.'
  assert username.strip(), 'Nombre de usuario no puede estar vacío.'

  return username


UserUsername = Annotated[str, AfterValidator(validate_user_username)]
'''Value object for user's username.'''

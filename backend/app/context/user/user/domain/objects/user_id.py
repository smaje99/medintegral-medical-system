from typing import Annotated

from pydantic import AfterValidator


__all__ = ('UserId',)


def validate_user_id(user_id: str) -> str:
  '''Validate user id.

  Args:
      user_id (str): User id.

  Returns:
      str: Validated user id.
  '''
  assert user_id is not None, 'Identificación del usuario es requerido.'
  assert isinstance(user_id, str), 'Identificación del usuario debe ser una cadena de texto.'
  assert user_id.strip(), 'Identificación del usuario no puede estar vacía.'
  assert user_id.isdigit(), 'Identificación del usuario debe ser numérica.'

  return user_id


UserId = Annotated[str, AfterValidator(validate_user_id)]
'''Value object for user ID.'''

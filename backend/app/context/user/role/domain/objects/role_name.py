from typing import Annotated

from pydantic.functional_validators import AfterValidator


__all__ = ('RoleName',)


ROLE_NAME_MIN_LENGTH = 4
ROLE_NAME_MAX_LENGTH = 20
ROLE_NAME_MAX_WORDS = 1


def validate_role_name(role_name: str) -> str:
  '''Validate role name.

  Args:
      role_name (str): Role name.

  Returns:
      str: Role name.
  '''
  assert role_name is not None, 'Nombre del rol es requerido'
  assert (
    len(role_name) >= ROLE_NAME_MIN_LENGTH
  ), 'Nombre del rol debe tener al menos 4 caracteres'
  assert (
    len(role_name) <= ROLE_NAME_MAX_LENGTH
  ), 'Nombre del rol debe tener menos de 20 caracteres'
  assert role_name.isalpha(), 'Nombre del rol debe contener solo letras'
  assert (
    len(role_name.strip.split()) == ROLE_NAME_MAX_WORDS
  ), 'Nombre del rol no puede contener espacios en blanco'

  return role_name


def transform_role_name(role_name: str) -> str:
  '''Transform role name.

  Args:
      role_name (str): Role name.

  Returns:
      str: Role name transformed to lowercase and trimmed.
  '''
  return role_name.strip().lower()


RoleName = Annotated[
  str, AfterValidator(validate_role_name), AfterValidator(transform_role_name)
]

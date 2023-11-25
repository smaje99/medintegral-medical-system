from typing import Annotated

from pydantic.functional_validators import AfterValidator


__all__ = ('RoleDescription',)


def validate_role_description(role_description: str) -> str:
  '''Validate role description.

  Args:
      role_description (str): Role description.

  Returns:
      str: Role description.
  '''
  assert role_description is not None, 'Descripción del rol es requerida'

  return role_description


def transform_role_description(role_description: str) -> str:
  '''Transform role description.

  Args:
      role_description (str): Role description.

  Returns:
      str: Role description transformed to capitalize and trimmed.
  '''
  return role_description.strip().capitalize()


RoleDescription = Annotated[
  str,
  AfterValidator(validate_role_description),
  AfterValidator(transform_role_description),
]

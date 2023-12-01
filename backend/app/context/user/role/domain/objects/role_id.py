from typing import Annotated
from uuid import UUID

from pydantic import AfterValidator


__all__ = ('RoleId',)


def is_valid_uuid(uuid_to_test: str, version: int = 4) -> bool:
  '''Validate uuid.

  Args:
      uuid_to_test (str): UUID to test.
      version (int, optional): Version. Defaults to 4.

  Returns:
      bool: Is valid.
  '''
  try:
    uuid_obj = UUID(uuid_to_test, version=version)
  except ValueError:
    return False

  return str(uuid_obj) == uuid_to_test.lower() and uuid_obj.version == version


def validate_role_id(role_id: UUID | str) -> UUID | str:
  '''Validate role id.

  Args:
      role_id (UUID | str): Role id.

  Returns:
      UUID: Validated role id.
  '''
  assert role_id is not None, 'Id del rol es requerido'
  assert is_valid_uuid(str(role_id)), 'Id del rol no es válido'

  return role_id


def transform_role_id(role_id: UUID | str) -> UUID:
  '''Transform role id.

  Args:
      role_id (UUID | str): Role id.

  Returns:
      UUID: Transformed role id.
  '''
  return role_id if isinstance(role_id, UUID) else UUID(role_id, version=4)


RoleId = Annotated[
  UUID, AfterValidator(validate_role_id), AfterValidator(transform_role_id)
]

from typing import Self, final, override

from app.context.shared.domain.errors import ResourceAlreadyExists
from app.context.user.role.domain import RoleId


@final
class RoleAlreadyExists(ResourceAlreadyExists):
  '''Role already exists error class.'''

  @classmethod
  def from_name(cls, name: str) -> Self:
    '''Role with name already exists error factory.

    Args:
        name (str): Role name.

    Returns:
        Self: RoleAlreadyExists error.
    '''
    return cls(f'El rol de {name} ya existe')

  @classmethod
  @override
  def from_id(cls, obj_id: RoleId) -> Self:
    '''Role with ID already exists error factory.

    Args:
        obj_id (RoleId): Role ID.

    Returns:
        Self: RoleAlreadyExists error.
    '''
    return cls(f'El rol con id {obj_id} ya existe')

from typing import Self

from app.context.shared.domain.errors import ResourceAlreadyExists
from app.context.user.role.domain import RoleId


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
  def from_id(cls, id: RoleId) -> Self:
    '''Role with ID already exists error factory.

    Args:
        id (RoleId): Role ID.

    Returns:
        Self: RoleAlreadyExists error.
    '''
    return cls(f'El rol con id {id} ya existe')

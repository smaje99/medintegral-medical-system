from typing import Self, final, override

from app.context.shared.domain.errors import ResourceAlreadyExists
from app.context.user.user.domain.objects import UserId


__all__ = ('UserAlreadyExists',)


@final
class UserAlreadyExists(ResourceAlreadyExists):
  '''Role already exists error class.'''

  @classmethod
  @override
  def from_id(cls, obj_id: UserId) -> Self:
    '''User with ID already exists error factory.

    Args:
        obj_id (UserId): User ID.

    Returns:
        Self: UserAlreadyExists error.
    '''
    return cls(f'El usuario con el id {obj_id} ya existe')

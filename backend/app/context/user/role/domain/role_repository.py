from abc import ABCMeta, abstractmethod

from app.context.user.role.domain.role import Role
from app.context.user.role.domain.role_dto import RoleSaveDTO


__all__ = ('RoleRepository',)


class RoleRepository(metaclass=ABCMeta):
  '''Role repository interface.'''

  @abstractmethod
  async def save(self, role_in: RoleSaveDTO) -> Role:
    '''Save a new role.

    Args:
        role_in (RoleSaveDTO): Role to save.

    Returns:
        Role: Saved role.
    '''

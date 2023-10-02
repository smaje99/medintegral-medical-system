from abc import ABCMeta, abstractmethod

from .role_model import Role
from .role_dto import RoleSaveDTO


class RoleRepository(metaclass=ABCMeta):
    '''Role repository interface'''

    @abstractmethod
    async def save(self, role_in: RoleSaveDTO) -> Role:
        '''Save a new role.

        Args:
            role (Role): Role to save.

        Returns:
            Role: Saved role.
        '''

from app.context.user.role.application import RoleCreator
from app.context.user.role.domain import Role, RoleSaveDTO


__all__ = ('RoleCreateController',)


class RoleCreateController:
  '''Role create controller.'''

  def __init__(self, role_creator: RoleCreator):
    '''Role create controller constructor.

    Args:
        role_creator (RoleCreator): Role creator.
    '''
    self.__role_creator = role_creator

  async def __call__(self, role_in: RoleSaveDTO) -> Role:
    '''Create a new role.

    Args:
        role_in (RoleSaveDTO): Role to save.

    Returns:
        Role: Role created.
    '''
    return await self.__role_creator(role_in)

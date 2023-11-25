from app.context.user.role.domain import Role, RoleRepository, RoleSaveDTO


__all__ = ('RoleCreator',)


class RoleCreator:
  '''Role Creator.'''

  def __init__(self, repository: RoleRepository) -> None:
    '''Role Creator constructor.

    Args:
        repository (RoleRepository): Role repository.
    '''
    self.__repository = repository

  async def __call__(self, role_in: RoleSaveDTO) -> Role:
    '''Implementation of the Role creation use case.

    Args:
        role_in (RoleSaveDTO): Role to create.

    Returns:
        Role: Created role.
    '''
    return await self.__repository.save(role_in)

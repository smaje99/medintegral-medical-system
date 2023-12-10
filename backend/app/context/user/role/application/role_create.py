from app.context.user.role.domain import Role, RoleRepository, RoleSaveDTO
from app.context.user.role.domain.role_errors import RoleAlreadyExists


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

    Raises:
      RoleAlreadyExists: If a role with the same name already exists.

    Returns:
        Role: Created role.
    '''
    if await self.__repository.contains_by_name(role_in.name):
      raise RoleAlreadyExists.from_name(role_in.name)

    return await self.__repository.save(role_in)

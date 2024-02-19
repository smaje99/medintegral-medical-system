from app.context.user.role.domain import Role, RoleRepository


__all__ = ('RoleFinderAll',)


class RoleFinderAll:
  '''Role Finder All class.'''

  def __init__(self, repository: RoleRepository):
    '''Role Finder All constructor.

    Args:
      repository (RoleRepository): Role repository.
    '''
    self._repository = repository

  async def __call__(self) -> list[Role]:
    '''Find all roles.

    Returns:
      list[Role]: List of roles.
    '''
    return await self._repository.find_all()

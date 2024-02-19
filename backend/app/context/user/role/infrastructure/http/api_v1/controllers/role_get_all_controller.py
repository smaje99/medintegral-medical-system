from app.context.user.role.application import RoleFinderAll
from app.context.user.role.domain.role import Role


class RoleGetAllController:
  '''Role Get All Controller class.'''

  def __init__(self, role_finder_all: RoleFinderAll):
    '''Role Get All Controller constructor.

    Args:
        role_finder_all (RoleFinderAll): Role Finder All.
    '''
    self._role_finder_all = role_finder_all

  async def __call__(self) -> list[Role]:
    '''Retrieve all roles.

    Returns:
        list[Role]: List of roles.
    '''
    return await self._role_finder_all()

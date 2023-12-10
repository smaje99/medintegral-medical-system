from starlette.status import HTTP_409_CONFLICT

from app.context.user.role.application import RoleCreator
from app.context.user.role.domain import Role, RoleSaveDTO
from app.context.user.role.domain.role_errors import RoleAlreadyExists
from app.core.errors import HTTPException


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
    try:
      return await self.__role_creator(role_in)
    except RoleAlreadyExists as error:
      raise HTTPException(
        status_code=HTTP_409_CONFLICT, message=error.message, error_type=error
      ) from error

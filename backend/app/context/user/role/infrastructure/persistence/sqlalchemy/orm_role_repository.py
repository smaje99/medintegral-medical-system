from typing_extensions import override

from .orm_role_dao import OrmRoleDao
from .orm_role_entity import OrmRoleEntity
from app.context.shared.domain.errors import DaoError
from app.context.user.role.domain import Role, RoleRepository, RoleSaveDTO


__all__ = ('OrmRoleRepository',)


class OrmRoleRepository(RoleRepository):
  '''ORM Role Repository.'''

  def __init__(self, dao: OrmRoleDao):
    '''ORM Role Repository constructor.

    Args:
        dao (OrmRoleDao): ORM Role DAO.
    '''
    self.__dao = dao

  @override
  async def save(self, role_in: RoleSaveDTO) -> Role:
    obj_in_role = role_in.model_dump()
    orm_role = OrmRoleEntity(**obj_in_role)
    db_role = await self.__dao.save(orm_role)

    return Role.model_validate(db_role)

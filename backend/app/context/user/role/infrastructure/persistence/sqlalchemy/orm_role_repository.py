from typing_extensions import override

from .orm_role_dao import OrmRoleDao
from .orm_role_entity import OrmRoleEntity
from app.context.user.role.domain import Role, RoleId, RoleRepository, RoleSaveDTO


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

  @override
  async def contains(self, role_id: RoleId) -> bool:
    return await self.__dao.exists(role_id)

  @override
  async def contains_by_name(self, name: str) -> bool:
    roles = await self.__dao.filter(OrmRoleEntity.name.like(name))

    return len(roles) == 1

  @override
  async def find_all(self) -> list[Role]:
    roles = await self.__dao.filter()

    return [Role.model_validate(role) for role in roles]

from typing import override

from .orm_role_entity import OrmRoleEntity
from app.context.shared.infrastructure.persistence.sqlalchemy import OrmDao
from app.context.user.role.domain import RoleId


__all__ = ('OrmRoleDao',)


class OrmRoleDao(OrmDao[OrmRoleEntity, RoleId]):
  '''SQLAlchemy ORM implementation of ORM DAO.'''

  @override
  def __new__(cls, *args, **kwargs):
    instance = super().__new__(cls)
    instance._entity = OrmRoleEntity

    return instance

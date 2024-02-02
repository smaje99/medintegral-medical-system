from typing import override

from .orm_user_entity import OrmUserEntity
from app.context.shared.infrastructure.persistence.sqlalchemy import OrmDao
from app.context.user.user.domain import UserId


__all__ = ('OrmUserDao',)


class OrmUserDao(OrmDao[OrmUserEntity, UserId]):
  '''SQLAlchemy ORM implementation of ORM DAO.'''

  @override
  def __new__(cls, *args, **kwargs):
    instance = super().__new__(cls)
    instance._entity = OrmUserEntity

    return instance

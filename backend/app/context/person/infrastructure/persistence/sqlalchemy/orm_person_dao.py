from typing import override

from .orm_person_entity import OrmPersonEntity
from app.context.person.domain import PersonId
from app.context.shared.infrastructure.persistence.sqlalchemy import OrmDao


__all__ = ('OrmPersonDao',)


class OrmPersonDao(OrmDao[OrmPersonEntity, PersonId]):
  '''SQLAlchemy ORM implementation of ORM DAO.'''

  @override
  def __new__(cls, *args, **kwargs):
    instance = super().__new__(cls)
    instance._entity = OrmPersonEntity

    return instance

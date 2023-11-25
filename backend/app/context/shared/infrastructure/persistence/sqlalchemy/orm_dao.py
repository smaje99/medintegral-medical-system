from abc import ABCMeta
from typing import TypeVar
from uuid import UUID

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import BinaryExpression, select
from typing_extensions import override

from app.context.shared.domain import DAO
from app.context.shared.domain.errors import DaoError
from app.database import Base


__all__ = ('OrmDao',)


EntityBase = TypeVar('EntityBase', bound=Base)


class OrmDao(DAO[EntityBase], metaclass=ABCMeta):
  '''Abstract SQLAlchemy ORM DAO.'''

  def __init__(self, database: AsyncSession):
    '''Abstract SQLAlchemy ORM DAO constructor.

    Args:
        database (AsyncSession): Database session.
    '''
    self._entity: type[EntityBase]
    self._database = database

  async def __upsert(self, entity: EntityBase) -> EntityBase:
    '''Save or update an entity.

    Args:
        entity (Entity): Entity to upsert.

    Returns:
        Entity: Upserted entity.
    '''
    self._database.add(entity)
    await self._database.commit()
    await self._database.refresh(entity)

    return entity

  @override
  async def save(self, entity: EntityBase):
    try:
      return await self.__upsert(entity)
    except SQLAlchemyError as error:
      raise DaoError.save_operation_failed() from error

  @override
  async def update(self, entity: EntityBase) -> EntityBase:
    try:
      return await self.__upsert(entity)
    except SQLAlchemyError as error:
      raise DaoError.update_operation_failed() from error

  @override
  async def search(self, entity_id: UUID) -> EntityBase | None:
    try:
      return await self._database.get(self._entity, entity_id)
    except SQLAlchemyError as error:
      raise DaoError.retrieve_operation_failed() from error

  @override
  async def filter(self, *expressions: BinaryExpression) -> list[EntityBase]:
    try:
      query = select(self._entity)

      if expressions:
        query = query.where(*expressions)

      result = await self._database.scalars(query)
      return list(result.all())
    except SQLAlchemyError as error:
      raise DaoError.retrieve_operation_failed() from error

  @override
  async def delete(self, entity: EntityBase) -> EntityBase:
    try:
      await self._database.delete(entity)
      await self._database.commit()
    except SQLAlchemyError as error:
      raise DaoError.delete_operation_failed() from error

    return entity

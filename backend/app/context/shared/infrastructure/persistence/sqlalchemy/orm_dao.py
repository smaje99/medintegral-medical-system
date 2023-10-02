from abc import ABCMeta
from typing import TypeVar
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import select

from app.context.shared.domain import DAO
from app.database import Base


Entity = TypeVar('Entity', bound=Base)


class OrmDao(DAO[Entity], metaclass=ABCMeta):
    '''Abstract SQLAlchemy ORM DAO'''

    def __init__(self, database: AsyncSession):
        '''Abstract SQLAlchemy ORM DAO constructor.

        Args:
            database (AsyncSession): Database session.
        '''
        self.__entity: type[Entity]
        self._database = database

    async def __upsert(self, entity: Entity) -> Entity:
        '''Save or update an entity.

        Args:
            entity (Entity): Entity to upsert.

        Returns:
            Entity: Upserted entity.
        '''
        self._database.add(entity)
        self._database.commit()
        self._database.refresh(entity)

        return entity

    async def save(self, entity: Entity) -> Entity:
        return await self.__upsert(entity)

    async def update(self, entity: Entity) -> Entity:
        return await self.__upsert(entity)

    async def search(self, entity_id: UUID) -> Entity | None:
        return self._database.get(self.__entity, entity_id)

    async def search_all(self) -> list[Entity]:
        return self._database.scalars(select(self.__entity)).all()

    async def delete(self, entity: Entity) -> Entity:
        self._database.delete(entity)
        self._database.commit()

        return entity

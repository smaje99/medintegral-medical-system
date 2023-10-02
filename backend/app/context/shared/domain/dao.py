from abc import ABCMeta, abstractmethod
from typing import Generic, TypeVar
from uuid import UUID


Entity = TypeVar('Entity')


class DAO(Generic[Entity], metaclass=ABCMeta):
    '''Generic DAO interface'''

    @abstractmethod
    async def save(self, entity: Entity) -> Entity:
        '''Create a new entity

        Args:
            entity (Entity): Entity to create.

        Returns:
            Entity: Created entity.
        '''

    @abstractmethod
    async def update(self, entity: Entity) -> Entity:
        '''Update an entity

        Args:
            entity (Entity | dict[str, Any]): Entity to update.

        Returns:
            Entity: Updated entity.
        '''

    @abstractmethod
    async def search(self, entity_id: UUID) -> Entity | None:
        '''Search an entity

        Args:
            entity_id (UUID): Entity id.

        Returns:
            Entity: Found entity.
        '''

    @abstractmethod
    async def search_all(self) -> list[Entity]:
        '''Search all entities

        Returns:
            list[Entity]: Found entities.
        '''

    @abstractmethod
    async def delete(self, entity: Entity) -> Entity:
        '''Delete an entity

        Args:
            entity (Entity): Entity to delete.

        Returns:
            Entity: Deleted entity.
        '''

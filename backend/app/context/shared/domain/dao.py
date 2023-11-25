from abc import ABCMeta, abstractmethod
from typing import Generic, TypeVar
from uuid import UUID


__all__ = ('DAO',)


EntityBase = TypeVar('EntityBase')


class DAO(Generic[EntityBase], metaclass=ABCMeta):
  '''Generic DAO interface.'''

  @abstractmethod
  async def save(self, entity: EntityBase) -> EntityBase:
    '''Create a new entity.

    Args:
        entity (EntityBase): Entity to create.

    Returns:
        EntityBase: Created entity.
    '''

  @abstractmethod
  async def update(self, entity: EntityBase) -> EntityBase:
    '''Update an entity.

    Args:
        entity (EntityBase | dict[str, Any]): Entity to update.

    Returns:
        EntityBase: Updated entity.
    '''

  @abstractmethod
  async def search(self, entity_id: UUID) -> EntityBase | None:
    '''Search an entity.

    Args:
        entity_id (UUID): Entity id.

    Returns:
        EntityBase: Found entity.
    '''

  @abstractmethod
  async def filter(self, *expressions) -> list[EntityBase]:
    '''Filter entities.

    Args:
        *expressions (tuple[Any]): Expressions to filter.

    Returns:
        list[EntityBase]: Filtered entities.
    '''

  @abstractmethod
  async def delete(self, entity: EntityBase) -> EntityBase:
    '''Delete an entity.

    Args:
        entity (EntityBase): Entity to delete.

    Returns:
        EntityBase: Deleted entity.
    '''

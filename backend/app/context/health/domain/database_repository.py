from abc import ABCMeta, abstractmethod


__all__ = ('DatabaseRepository',)


class DatabaseRepository(metaclass=ABCMeta):
  '''Abstract repository for the database.'''

  @abstractmethod
  async def check_database(self) -> bool:
    '''Check if the database is available.

    Returns:
      bool: True if the database is available, False otherwise.
    '''

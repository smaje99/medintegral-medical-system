from app.context.health.domain import DatabaseRepository


__all__ = ('DatabaseChecker',)


class DatabaseChecker:
  '''Database check.'''

  def __init__(self, repository: DatabaseRepository):
    '''Database check.

    Args:
        repository (DatabaseRepository): Repository of the database.
    '''
    self.__repository = repository

  async def __call__(self) -> bool:
    '''Implementation of the check of the database.

    Returns:
        bool: True if the database is connected.
    '''
    return await self.__repository.check_database()

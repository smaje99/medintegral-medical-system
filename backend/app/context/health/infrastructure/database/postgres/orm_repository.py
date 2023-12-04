from typing_extensions import override

from app.context.health.domain import DatabaseRepository
from app.context.health.infrastructure.database.postgres import OrmDatabaseDao


__all__ = ('OrmDatabaseRepository',)


class OrmDatabaseRepository(DatabaseRepository):
  '''Repository for the ORM of the Postgres database.'''

  def __init__(self, orm_dao: OrmDatabaseDao):
    '''Repository for the ORM of the Postgres database.

    Args:
        orm_dao (OrmDatabaseDao): DAO for the ORM of the Postgres database.
    '''
    self.__orm_dao = orm_dao

  @override
  async def check_database(self) -> bool:
    try:
      await self.__orm_dao.get_number_one()
      return True
    except Exception:
      return False

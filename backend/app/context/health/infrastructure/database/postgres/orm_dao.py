from typing import Literal, cast

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql.expression import select

from app.context.shared.domain.errors import DaoError
from app.database.postgres import PostgresDatabase


__all__ = ('OrmDatabaseDao',)


class OrmDatabaseDao:
  '''DAO for the ORM of the Postgres database.'''

  def __init__(self, database: PostgresDatabase):
    ''''DAO for the ORM of the Postgres database.

    Args:
        database (PostgresDatabase): Database session.
    '''
    self.__database = database

  async def get_number_one(self) -> Literal[1]:
    '''Get the number one from the database.

    Raises:
        DaoError: Database not connection.

    Returns:
        Literal[1]: The number one.
    '''
    async with self.__database.session() as session:
      try:
        query = select(1)
        result = await session.scalar(query)
        return cast(Literal[1], result)
      except SQLAlchemyError as error:
        raise DaoError('Database not connection') from error

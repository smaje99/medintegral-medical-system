from app.context.health.application import DatabaseChecker
from app.context.health.infrastructure.health_dto import HealthResponse


class HealthController:
  '''Controller for the health endpoint.'''

  def __init__(self, database_checker: DatabaseChecker):
    '''Controller for the health endpoint.

    Args:
      database_checker: The database checker.
    '''
    self.__database_checker = database_checker

  async def __call__(self) -> HealthResponse:
    '''Handle the health request.'''
    database = await self.__database_checker()

    return HealthResponse(database=database)

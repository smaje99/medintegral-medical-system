from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Dependency, Factory

from app.context.health.application.database_checker import DatabaseChecker
from app.context.health.domain.database_repository import DatabaseRepository
from app.context.health.infrastructure.database.postgres import (
  OrmDatabaseDao,
  OrmDatabaseRepository,
)
from app.context.health.infrastructure.http.api_v1 import HealthController
from app.database.postgres import PostgresDatabase


__all__ = ('HealthContainer',)


class HealthContainer(DeclarativeContainer):
  '''Container for the Health dependencies.'''

  database = Dependency(instance_of=PostgresDatabase)

  orm_dao = Factory(OrmDatabaseDao, database=database)

  database_repository: Factory[DatabaseRepository] = Factory(
    OrmDatabaseRepository, orm_dao=orm_dao
  )

  database_checker = Factory(DatabaseChecker, repository=database_repository)

  health_controller = Factory(HealthController, database_checker=database_checker)

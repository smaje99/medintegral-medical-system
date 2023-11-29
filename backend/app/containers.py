from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Configuration, Container, Singleton

from app.context.user.role.infrastructure.role_containers import RoleContainer
from app.database.postgres import PostgresDatabase


__all__ = ('ApplicationContainer',)


class ApplicationContainer(DeclarativeContainer):
  '''Container for the application dependencies.'''

  config = Configuration()

  database = Singleton(
    PostgresDatabase, db_uri=config.postgres.uri, echo=config.postgres.echo
  )

  role = Container(RoleContainer, database=database)

from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Container, Dependency

from app.context.user.role.infrastructure.role_containers import RoleContainer
from app.database.postgres import PostgresDatabase


__all__ = ('UserMainContainer',)


class UserMainContainer(DeclarativeContainer):
  '''Main container for the user context dependencies.'''

  database = Dependency(instance_of=PostgresDatabase)

  role = Container(RoleContainer, database=database)

from dependency_injector.containers import DeclarativeContainer, WiringConfiguration
from dependency_injector.providers import Configuration, Container, Singleton

from app.context.health.infrastructure.health_containers import HealthContainer
from app.context.health.infrastructure.http.api_v1 import health_endpoints
from app.context.user.role.infrastructure.http.api_v1 import role_endpoints
from app.context.user.role.infrastructure.role_containers import RoleContainer
from app.database.postgres import PostgresDatabase


__all__ = ('ApplicationContainer',)


class ApplicationContainer(DeclarativeContainer):
  '''Container for the application dependencies.'''

  wiring_config = WiringConfiguration(modules=[role_endpoints, health_endpoints])

  config = Configuration()

  database = Singleton(
    PostgresDatabase,
    db_uri=config.postgres.uri.as_(str),
    echo=config.postgres.echo,
  )

  role = Container(RoleContainer, database=database)

  health = Container(HealthContainer, database=database)

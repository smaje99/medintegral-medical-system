from dependency_injector.containers import DeclarativeContainer, WiringConfiguration
from dependency_injector.providers import Configuration, Container, Singleton

from app.context.health.infrastructure.health_containers import HealthContainer
from app.context.health.infrastructure.http.api_v1 import health_endpoints
from app.context.person.infrastructure import PersonContainer
from app.context.user.role.infrastructure.http.api_v1 import role_endpoints
from app.context.user.shared.infrastructure.user_main_containers import UserMainContainer
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

  user = Container(UserMainContainer, database=database)

  health = Container(HealthContainer, database=database)

  person = Container(PersonContainer, database=database)

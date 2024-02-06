from dependency_injector.containers import DeclarativeContainer, WiringConfiguration
from dependency_injector.providers import Configuration, Container, Singleton

from app.context.health.infrastructure.health_containers import HealthContainer
from app.context.health.infrastructure.http.api_v1 import health_endpoints
from app.context.person.infrastructure import PersonContainer
from app.context.person.infrastructure.http.api_v1 import person_endpoints
from app.context.shared.domain import EmailSender
from app.context.shared.infrastructure.email_sender import ResendEmailSender
from app.context.user.role.infrastructure.http.api_v1 import role_endpoints
from app.context.user.shared.infrastructure.user_main_containers import UserMainContainer
from app.context.user.user.infrastructure.http.api_v1 import user_endpoints
from app.database.postgres import PostgresDatabase


__all__ = ('ApplicationContainer',)


class ApplicationContainer(DeclarativeContainer):
  '''Container for the application dependencies.'''

  wiring_config = WiringConfiguration(
    modules=[role_endpoints, health_endpoints, user_endpoints, person_endpoints]
  )

  config = Configuration()

  database = Singleton(
    PostgresDatabase,
    db_uri=config.postgres.uri.as_(str),
    echo=config.postgres.echo.as_(bool),
  )

  email_sender: Singleton[EmailSender] = Singleton(
    ResendEmailSender,
    from_name=config.email.from_name.as_(str),
    from_email=config.email.from_email.as_(str),
    emails_enabled=config.email.emails_enabled.as_(bool),
    api_key=config.email.api_key.as_(str),
  )

  person = Container(PersonContainer, database=database)

  user = Container(
    UserMainContainer,
    database=database,
    email_sender=email_sender,
    config=config,
    person=person,
  )

  health = Container(HealthContainer, database=database)

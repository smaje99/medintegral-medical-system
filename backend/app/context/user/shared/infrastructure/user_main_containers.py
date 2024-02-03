from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import (
  Configuration,
  Container,
  DependenciesContainer,
  Dependency,
)

from app.context.shared.domain import EmailSender
from app.context.user.role.infrastructure.role_containers import RoleContainer
from app.context.user.user.infrastructure import UserContainer
from app.database.postgres import PostgresDatabase


__all__ = ('UserMainContainer',)


class UserMainContainer(DeclarativeContainer):
  '''Main container for the user context dependencies.'''

  config = Configuration()

  person = DependenciesContainer()

  database = Dependency(instance_of=PostgresDatabase)

  email_sender = Dependency(instance_of=EmailSender)

  role = Container(RoleContainer, database=database)

  user = Container(
    UserContainer,
    config=config,
    database=database,
    email_sender=email_sender,
    person=person,
    role=role,
  )

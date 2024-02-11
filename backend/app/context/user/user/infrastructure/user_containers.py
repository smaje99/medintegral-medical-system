from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import (
  Configuration,
  DependenciesContainer,
  Dependency,
  Factory,
)

from app.context.shared.domain import EmailSender
from app.context.user.user.application import UserCreator
from app.context.user.user.domain import UserRepository
from app.context.user.user.infrastructure.http.api_v1.controllers import (
  UserPostController,
)
from app.context.user.user.infrastructure.persistence.sqlalchemy import (
  OrmUserDao,
  OrmUserRepository,
)
from app.database.postgres import PostgresDatabase


__all__ = ('UserContainer',)


class UserContainer(DeclarativeContainer):
  '''Container for the User dependencies.'''

  config = Configuration()

  person = DependenciesContainer()

  role = DependenciesContainer()

  database = Dependency(instance_of=PostgresDatabase)

  email_sender = Dependency(instance_of=EmailSender)

  user_dao = Factory(OrmUserDao, database=database)

  user_repository: Factory[UserRepository] = Factory(OrmUserRepository, dao=user_dao)

  user_creator = Factory(
    UserCreator,
    user_repository=user_repository,
    person_repository=person.person_repository,
    role_repository=role.role_repository,
    email_sender=email_sender,
    client_host=config.domain.client_host.as_(str),
  )

  user_post_controller = Factory(UserPostController, user_creator=user_creator)

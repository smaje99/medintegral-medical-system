from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Dependency, Factory

from app.context.person.application import PersonCreator
from app.context.person.domain import PersonRepository
from app.context.person.infrastructure.persistence.sqlalchemy import (
  OrmPersonDao,
  OrmPersonRepository,
)
from app.database.postgres import PostgresDatabase


__all__ = ('PersonContainer',)


class PersonContainer(DeclarativeContainer):
  '''Container for the Person dependencies.'''

  database = Dependency(instance_of=PostgresDatabase)

  person_dao = Factory(OrmPersonDao, database=database)

  person_repository: Factory[PersonRepository] = Factory(
    OrmPersonRepository, dao=person_dao
  )

  person_creator = Factory(PersonCreator, repository=person_repository)

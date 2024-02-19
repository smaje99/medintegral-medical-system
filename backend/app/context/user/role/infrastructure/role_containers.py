from dependency_injector.containers import DeclarativeContainer
from dependency_injector.providers import Dependency, Factory

from app.context.user.role.application import RoleCreator, RoleFinderAll
from app.context.user.role.domain import RoleRepository
from app.context.user.role.infrastructure.http.api_v1.controllers import (
  RoleCreateController,
  RoleGetAllController,
)
from app.context.user.role.infrastructure.persistence.sqlalchemy import (
  OrmRoleDao,
  OrmRoleRepository,
)
from app.database.postgres import PostgresDatabase


__all__ = ('RoleContainer',)


class RoleContainer(DeclarativeContainer):
  '''Container for the Role dependencies.'''

  database = Dependency(instance_of=PostgresDatabase)

  role_dao = Factory(OrmRoleDao, database=database)

  role_repository: Factory[RoleRepository] = Factory(OrmRoleRepository, dao=role_dao)

  role_creator = Factory(RoleCreator, repository=role_repository)

  role_create_controller = Factory(RoleCreateController, role_creator=role_creator)

  role_finder_all = Factory(RoleFinderAll, repository=role_repository)

  role_get_all_controller = Factory(RoleGetAllController, role_finder_all=role_finder_all)

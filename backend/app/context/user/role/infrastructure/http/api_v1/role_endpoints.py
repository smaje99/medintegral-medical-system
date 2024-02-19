from typing import Annotated

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends
from starlette.status import HTTP_201_CREATED

from app.context.user.role.domain import Role, RoleSaveDTO
from app.context.user.role.infrastructure.http.api_v1.controllers import (
  RoleCreateController,
  RoleGetAllController,
)


__all__ = ('router',)


router = APIRouter()


@router.post('/', status_code=HTTP_201_CREATED)
@inject
async def create_role(  # noqa: D417
  role_in: Annotated[RoleSaveDTO, Body(alias='roleIn')],
  *,
  role_controller: RoleCreateController = Depends(  # noqa: B008
    Provide['user.role.role_create_controller']
  ),
) -> Role:
  '''Create a new role.

  Args:
  * role_in (RoleSaveDTO): Role to save.

  Raises:
  * RoleAlreadyExists: If the role already exist.

  Returns:
  * Role: Role created.
  '''
  return await role_controller(role_in)


@router.get('/')
@inject
async def retrieve_roles(  # noqa: D417
  *,
  role_controller: RoleGetAllController = Depends(  # noqa: B008
    Provide['user.role.role_get_all_controller']
  ),
) -> list[Role]:
  '''Retrieve all roles.

  Returns:
  * list[Role]: Roles retrieved.
  '''
  return await role_controller()

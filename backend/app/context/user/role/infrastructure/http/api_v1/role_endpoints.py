from typing import Annotated

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends
from starlette.status import HTTP_201_CREATED

from app.containers import ApplicationContainer as Container
from app.context.user.role.domain import Role, RoleSaveDTO
from app.context.user.role.infrastructure.http.api_v1.controllers import (
  RoleCreateController,
)


__all__ = ('router',)


router = APIRouter()


@router.post('/', status_code=HTTP_201_CREATED)
@inject
async def create_user(  # noqa: D417
  role_in: Annotated[RoleSaveDTO, Body(alias='roleIn')],
  *,
  role_controller: RoleCreateController = Depends(  # noqa: B008
    Provide[Container.role.role_create_controller]
  ),
) -> Role:
  '''Create a new role.

  Args:
  * role_in (RoleSaveDTO): Role to save.

  Returns:
  * Role: Role created.
  '''
  return await role_controller(role_in)

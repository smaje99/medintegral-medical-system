from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, Security
from starlette.status import HTTP_404_NOT_FOUND

from app.api.dependencies.auth import CurrentUserWithRole, get_current_active_user
from app.api.dependencies.services import ServiceDependency
from app.core.types import Role
from app.schemas.user.role import Role as RoleSchema, RoleCreate, RoleUpdate
from app.services.user import RoleService


router = APIRouter()

RoleServiceDependency = Annotated[RoleService, Depends(ServiceDependency(RoleService))]


@router.get('/{roleId}', dependencies=[Security(CurrentUserWithRole(Role.ADMIN))])
def read_role(
    role_id: Annotated[UUID, Path(alias='roleId')], service: RoleServiceDependency
) -> RoleSchema:
    '''Retrieve a role by a given ID.
    if the ID doesn't exist then raise a error.

    Args:
    * role_id (UUID): ID given to retrieve the role via path parameter.

    Raises:
    * HTTPException: HTTP 404. The role wasn't found,

    Returns:
    * Role: The role associated with the given ID.
    '''
    if not (role := service.get(role_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El rol no existe en el sistema'
        )

    return role  # type: ignore


@router.get('/', dependencies=[Security(get_current_active_user)])
def read_roles(
    *,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query()] = 50,
    service: RoleServiceDependency,
) -> list[RoleSchema]:
    '''Retrieve a list of roles.

    Args:
    * skip (int): Start cut of subset via query parameter. Defaults to 0.
    * limit (int): Subset length via query parameter. Defaults to 50

    Returns:
    * list[Role]: Specified subset of roles.
    '''
    return service.get_all(skip=skip, limit=limit)  # type: ignore


@router.post('/', dependencies=[Security(CurrentUserWithRole(Role.ADMIN))])
def create_role(
    role_in: Annotated[RoleCreate, Body(alias='roleIn')], service: RoleServiceDependency
) -> RoleSchema:
    '''Create a role.

    Args:
        role_in (RoleCreate): Data creation for a role via body parameter.

    Returns:
        Role: The Role's data created
    '''
    return service.create(role_in)  # type: ignore


@router.put('/{roleId}', dependencies=[Security(CurrentUserWithRole(Role.ADMIN))])
def update_role(
    role_id: Annotated[UUID, Path(alias='roleId')],
    role_in: Annotated[RoleUpdate, Body(alias='roleIn')],
    service: RoleServiceDependency,
) -> RoleSchema:
    '''Update a role with a given ID.

    Args:
    * role_id (UUID): ID given to retrieve the role via a path parameter.
    * role_in (RoleUpdate): Role's data to be updated via a body parameter.

    Raises:
    * HTTPException: HTTP 404. Role not found.

    Returns:
    * Role: The Role's data updated.
    '''
    if not (role := service.get(role_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El rol no existe en el sistema'
        )

    return service.update(db_obj=role, obj_in=role_in)  # type: ignore

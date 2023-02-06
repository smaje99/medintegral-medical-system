from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from starlette.status import HTTP_404_NOT_FOUND

from app.schemas.user.role import Role, RoleCreate, RoleUpdate
from app.services.user import RoleService

from .role_deps import get_service


router = APIRouter()


@router.get('/{role_id}')
def read_role(
    role_id: UUID = Path(...), service: RoleService = Depends(get_service)
) -> Role:
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


@router.get('/')
def read_roles(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50),
    service: RoleService = Depends(get_service),
) -> list[Role]:
    '''Retrieve a list of roles.

    Args:
    * skip (int): Start cut of subset via query parameter. Defaults to 0.
    * limit (int): Subset length via query parameter. Defaults to 50

    Returns:
    * list[Role]: Specified subset of roles.
    '''
    return service.get_all(skip=skip, limit=limit)  # type: ignore


@router.post('/')
def create_role(
    role_in: RoleCreate = Body(...), service: RoleService = Depends(get_service)
) -> Role:
    '''Create a role.

    Args:
        role_in (RoleCreate): Data creation for a role via body parameter.

    Returns:
        Role: The Role's data created
    '''
    return service.create(role_in)  # type: ignore


@router.put('/{role_id}')
def update_role(
    role_id: UUID = Path(...),
    role_in: RoleUpdate = Body(...),
    service: RoleService = Depends(get_service),
) -> Role:
    '''Update a role with a given ID.

    Args:
    * role_id (UUID): ID given to retrieve the role via a path parameter.
    * role_in (RoleUpdate): Role's data to be updated via a body parameter.

    Raises:
    * HTTPException: HTTP 404. The role wasn't found.

    Returns:
    * Role: The Role's data updated.
    '''
    if not (role := service.get(role_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El rol no existe en el sistema'
        )

    return service.update(db_obj=role, obj_in=role_in)  # type: ignore

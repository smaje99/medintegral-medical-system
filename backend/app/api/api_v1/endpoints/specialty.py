from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app.api.dependencies.auth import get_current_user_with_permissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import PermissionAction
from app.schemas.medical.specialty import Specialty, SpecialtyCreate, SpecialtyUpdate
from app.models.user import User
from app.services.medical import SpecialtyService


router = APIRouter()


@router.get('/{specialty_id}')
def read_specialty(
    _: User = Depends(
        get_current_user_with_permissions('especialidades', {PermissionAction.read})
    ),
    specialty_id: UUID = Path(...),
    service: SpecialtyService = Depends(ServiceDependency(SpecialtyService)),
) -> Specialty:
    '''Retrieve a specialty by a given ID.

    Args:
    * specialty_id (UUID): ID given to retrieve the specialty via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. The specialty wasn't found.

    Returns:
        Specialty: The specialty with the given ID.
    '''
    if not (specialty := service.get(specialty_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return specialty  # type: ignore


@router.get('/')
def read_specialties(
    _: User = Depends(
        get_current_user_with_permissions('especialidades', {PermissionAction.read})
    ),
    service: SpecialtyService = Depends(ServiceDependency(SpecialtyService)),
) -> list[Specialty]:
    '''Retrieve a specialties list.

    Returns:
    * list[Specialty]: Specialties list
    '''
    return service.get_all(limit=100)  # type: ignore


@router.post('/', status_code=HTTP_201_CREATED)
def create_specialty(
    _: User = Depends(
        get_current_user_with_permissions('especialidades', {PermissionAction.creation})
    ),
    specialty: SpecialtyCreate = Body(...),
    service: SpecialtyService = Depends(ServiceDependency(SpecialtyService)),
) -> Specialty:
    '''Create a specialty.

    Args:
    * doctor (DoctorCreate): Creation data for a specialty via body parameter.

    Raises:
    * HTTPException: HTTP error 409. The specialty is already created.

    Returns:
    * Specialty: New specialty.
    '''
    if service.contains_by_name(specialty.name):
        raise HTTPException(
            status_code=HTTP_409_CONFLICT, detail='La especialidad ya está creada'
        )

    return service.create(specialty)  # type: ignore


@router.put('/{specialty_id}')
def update_person(
    _: User = Depends(
        get_current_user_with_permissions('especialidades', {PermissionAction.update})
    ),
    specialty_id: UUID = Path(...),
    specialty_in: SpecialtyUpdate = Body(...),
    service: SpecialtyService = Depends(ServiceDependency(SpecialtyService)),
) -> Specialty:
    '''Update a specialty with a given ID.

    Args:
    * specialty_id (UUID): ID given to retrieve the specialty via path parameters.
    * specialty_in (SpecialtyUpdate): Specialty's data to be updated via body parameter.

    Raises:
    * HTTPException: HTTP error 404. The specialty wasn't found.

    Returns:
    * Specialty: The specialty's data updated.
    '''
    if not (specialty := service.get(specialty_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return service.update(db_obj=specialty, obj_in=specialty_in)  # type: ignore

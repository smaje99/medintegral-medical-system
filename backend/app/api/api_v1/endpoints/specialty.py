from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Security
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app.api.dependencies.auth import CurrentUserWithPermissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import Action, Permission
from app.schemas.medical.specialty import (
    Specialty,
    SpecialtyCreate,
    SpecialtyUpdate,
    SpecialtyWithServices,
)
from app.services.medical import SpecialtyService


router = APIRouter()

SpecialtyServiceDependency = Annotated[
    SpecialtyService, Depends(ServiceDependency(SpecialtyService))
]


@router.get(
    '/{specialtyId}',
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SPECIALTIES, {Action.READ}))
    ],
)
def read_specialty(
    specialty_id: Annotated[UUID, Path(alias='specialtyId')],
    service: SpecialtyServiceDependency,
) -> SpecialtyWithServices:
    '''Retrieve a specialty by a given ID.

    Args:
    * specialty_id (UUID): ID given to retrieve the specialty via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. The specialty wasn't found.

    Returns:
    * Specialty: The specialty with the given ID.
    '''
    if not (specialty := service.get(specialty_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return specialty  # type: ignore


@router.get(
    '/',
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SPECIALTIES, {Action.READ}))
    ],
)
def read_specialties(service: SpecialtyServiceDependency) -> list[Specialty]:
    '''Retrieve a specialties list.

    Returns:
    * list[Specialty]: Specialties list
    '''
    return service.get_all(limit=100)  # type: ignore


@router.post(
    '/',
    status_code=HTTP_201_CREATED,
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SPECIALTIES, {Action.CREATION}))
    ],
)
def create_specialty(
    specialty: Annotated[SpecialtyCreate, Body()], service: SpecialtyServiceDependency
) -> Specialty:
    '''Create a specialty.

    Args:
    * doctor (SpecialtyCreate): Creation data for a specialty via body parameter.

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


@router.put(
    '/{specialtyId}',
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SPECIALTIES, {Action.UPDATE}))
    ],
)
def update_person(
    specialty_id: Annotated[UUID, Path(alias='specialtyId')],
    specialty_in: Annotated[SpecialtyUpdate, Body(alias='specialtyIn')],
    service: SpecialtyServiceDependency,
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

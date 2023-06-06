from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, Security
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app.api.dependencies.auth import get_current_user_with_permissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import PermissionAction
from app.schemas.medical.service import Service, ServiceCreate, ServiceUpdate
from app.services.medical import ServiceService, SpecialtyService


router = APIRouter()

ServiceServiceDependency = Annotated[
    ServiceService, Depends(ServiceDependency(ServiceService))
]

SpecialtyServiceDependency = Annotated[
    SpecialtyService, Depends(ServiceDependency(SpecialtyService))
]


@router.get(
    '/',
    dependencies=[
        Security(get_current_user_with_permissions('servicios', {PermissionAction.read}))
    ],
)
def read_services_by_specialty(
    service_service: ServiceServiceDependency,
    specialty_service: SpecialtyServiceDependency,
    specialty_id: Annotated[UUID, Query(alias='specialtyId')] = ...,  # type: ignore
) -> list[Service]:
    '''Retrieves all active medical services associated with a medical specialty.

    Args:
    * specialtyId (UUID): Specialty ID via query parameter.

    Raises:
    * HTTPException: HTTP error 404. The specialty not found.

    Returns:
    * list[Service]: Medical services associated with a medial specialty.
    '''
    if not specialty_service.contains(specialty_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return service_service.get_all_by_specialty(specialty_id)  # type: ignore


@router.get(
    '/{serviceId}',
    dependencies=[
        Security(get_current_user_with_permissions('servicios', {PermissionAction.read}))
    ],
)
def read_service(
    service_id: Annotated[UUID, Path(alias='serviceId')],
    service: ServiceServiceDependency,
) -> Service:
    '''Retrieve a medical service by a given ID.
    If the given DNI doesn't exist, raise an error.

    Args:
    * serviceId (UUID): ID given to retrieve the medical service via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. Medical service not found.

    Returns:
    * User: The medical service with the given ID.
    '''
    if not (service_obj := service.get(service_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El servicio medico no existe'
        )

    return service_obj  # type: ignore


@router.post(
    '/',
    status_code=HTTP_201_CREATED,
    dependencies=[
        Security(
            get_current_user_with_permissions('servicios', {PermissionAction.creation})
        )
    ],
)
def create_service(
    service_in: Annotated[ServiceCreate, Body()],
    service_service: ServiceServiceDependency,
    specialty_service: SpecialtyServiceDependency,
) -> Service:
    '''Create a medical service.

    Args:
    * serviceIn (ServiceCreate): Creation data for a medical service via body parameter.

    Raises:
    * HTTPException: HTTP error 409. The medical service is already created.
    * HTTPException: HTTP error 404. The specialty not found.

    Returns:
    * Service: New medical service.
    '''
    if service_service.contains_by_name(service_in.name):
        raise HTTPException(
            status_code=HTTP_409_CONFLICT, detail='El servicio médico ya está creado'
        )

    if not specialty_service.contains(service_in.specialty_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return service_service.create(service_in)  # type:ignore


@router.put(
    '/{serviceId}',
    dependencies=[
        Security(
            get_current_user_with_permissions('servicios', {PermissionAction.update})
        )
    ],
)
def update_service(
    service_id: Annotated[UUID, Path(alias='serviceId')],
    service_in: Annotated[ServiceUpdate, Body()],
    service_service: ServiceServiceDependency,
    specialty_service: SpecialtyServiceDependency,
) -> Service:
    '''Update a medical service with a given ID.

    Args:
    * serviceId (UUID): ID given to retrieve the medical service via path parameters.
    * serviceIn (ServiceUpdate): Service's data to be updated via body parameter.

    Raises:
    * HTTPException: HTTP error 404. The medical service not found.
    * HTTPException: HTTP error 404. The specialty not found.

    Returns:
    * Service: The medical service's data updated.
    '''
    if not (service := service_service.get(service_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El servicio médico indicado no existe'
        )

    if (
        service_in.specialty_id
        and service_in.specialty_id != service.specialty_id
        and not specialty_service.contains(service_in.specialty_id)
    ):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La especialidad indicada no existe'
        )

    return service_service.update(db_obj=service, obj_in=service_in)  # type:ignore


@router.patch(
    '/disable/{serviceId}',
    dependencies=[
        Security(
            get_current_user_with_permissions('servicios', {PermissionAction.disable})
        )
    ],
)
def disable_service(
    service_id: Annotated[UUID, Path(alias='serviceId')],
    disable: Annotated[bool, Body(embed=True)],
    service_service: ServiceServiceDependency,
) -> Service:
    '''Change the medical service's status in the system.
    The medical service can be enabled or disabled.

    Args:
    * serviceId (UUID): DNI given to retrieve the medical service
    to be disabled via a path parameter.
    * disable (bool): New status to be assigned to the medical
    service via a body parameter

    Raises:
    * HTTPException: HTTP error 404. Medical service not found.

    Returns:
    * Service: Medical service with updated status.
    '''
    if not (service := service_service.get(service_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El servicio indicado no existe'
        )

    return service_service.disable(service, disable)  # type:ignore

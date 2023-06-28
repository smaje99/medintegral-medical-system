from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Security
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from app.api.dependencies.auth import CurrentUserWithPermissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import Action, Permission
from app.schemas.medical.service_doctor import (
    ServiceDoctor,
    ServiceDoctorCreate,
    ServiceDoctorUpdate,
)
from app.services.medical import DoctorService, ServiceDoctorService, ServiceService


router = APIRouter()

DoctorServiceDependency = Annotated[
    DoctorService, Depends(ServiceDependency(DoctorService))
]

ServiceDoctorServiceDependency = Annotated[
    ServiceDoctorService, Depends(ServiceDependency(ServiceDoctorService))
]

ServiceServiceDependency = Annotated[
    ServiceService, Depends(ServiceDependency(ServiceService))
]


@router.post(
    '/',
    status_code=HTTP_201_CREATED,
    dependencies=[
        Security(
            CurrentUserWithPermissions(Permission.SERVICES_DOCTORS, {Action.CREATION})
        )
    ],
)
def create_service_doctor(
    service_doctor_in: Annotated[ServiceDoctorCreate, Body()],
    doctor_service: DoctorServiceDependency,
    service_doctor_service: ServiceDoctorServiceDependency,
    service_service: ServiceServiceDependency,
) -> ServiceDoctor:
    '''Create a service-doctor.

    Args:
    * serviceDoctorIn (ServiceDoctorCreate): Creation data for a service-doctor
        via body parameter.

    Raises:
    * HTTPException: HTTP error 404. Doctor not found.
    * HTTPException: HTTP error 404. Service not found.
    * HTTPException: HTTP error 409. Service-doctor already exists.
    * HTTPException: HTTP error 403. Insufficient permissions.
    * HTTPException: HTTP error 400. Invalid data.
    * HTTPException: HTTP error 500. Internal error.

    Returns:
    * ServiceDoctor: Service-doctor created.
    '''

    if not doctor_service.contains(service_doctor_in.doctor_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El médico indicado no existe'
        )

    if not service_service.contains(service_doctor_in.service_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El servicio indicado no existe'
        )

    if service_doctor_service.contains_active_by_service_and_doctor(
        service_doctor_in.service_id, service_doctor_in.doctor_id
    ):
        raise HTTPException(
            status_code=HTTP_409_CONFLICT, detail='El médico ya tiene este servicio'
        )

    return service_doctor_service.create(service_doctor_in)  # type: ignore


@router.put(
    '/{serviceDoctorId}',
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SERVICES_DOCTORS, {Action.UPDATE}))
    ],
)
def update_service_doctor(
    service_doctor_id: Annotated[UUID, Path(alias='serviceDoctorId')],
    service_doctor_in: Annotated[ServiceDoctorUpdate, Body()],
    service_doctor_service: ServiceDoctorServiceDependency,
) -> ServiceDoctor:
    '''Update a service-doctor.

    Args:
    * serviceDoctorId (UUID): Service-doctor): Service-doctor ID via path parameter.
    * serviceDoctorIn (ServiceDoctorCreate): Update data for a service-doctor
        via body parameter.

    Raises:
    * HTTPException: HTTP error 404. Service-doctor not found.
    * HTTPException: HTTP error 403. Insufficient permissions.
    * HTTPException: HTTP error 400. Invalid data.
    * HTTPException: HTTP error 500. Internal error.

    Returns:
    * ServiceDoctor: Service-doctor updated.
    '''

    if not (service_doctor := service_doctor_service.get(service_doctor_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El médico asociado al servicio indicado no existe',
        )

    return service_doctor_service.update(  # type: ignore
        db_obj=service_doctor, obj_in=service_doctor_in
    )


@router.patch(
    '/{serviceDoctorId}/disable',
    dependencies=[
        Security(
            CurrentUserWithPermissions(Permission.SERVICES_DOCTORS, {Action.DISABLE})
        )
    ],
)
def disable_service_doctor(
    service_doctor_id: Annotated[UUID, Path(alias='serviceDoctorId')],
    disable: Annotated[bool, Body(embed=True)],
    service_doctor_service: ServiceDoctorServiceDependency,
) -> ServiceDoctor:
    '''Change the service-doctor's status in the system.
    The service-doctor can be enabled or disabled.

    Args:
    * serviceDoctorId (UUID): Service-doctor ID via path parameter.
    * disable (bool): Disable status via body parameter.

    Raises:
    * HTTPException: HTTP error 404. Service-doctor not found.
    * HTTPException: HTTP error 403. Insufficient permissions.
    * HTTPException: HTTP error 500. Internal error.

    Returns:
    * ServiceDoctor: Service-doctor with updated status.
    '''

    if not (service_doctor := service_doctor_service.get(service_doctor_id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El médico asociado al servicio indicado no existe',
        )

    return service_doctor_service.disable(service_doctor, disable)  # type: ignore

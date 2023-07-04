from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query, Security
from fastapi.responses import JSONResponse
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
)

from app.api.dependencies.auth import CurrentUserWithPermissions
from app.api.dependencies.services import ServiceDependency
from app.core.exceptions import SessionConflict, MixingSession
from app.core.types import Action, Permission, Session
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


@router.get(
    '/{serviceIdOrDoctorId}',
    dependencies=[
        Security(CurrentUserWithPermissions(Permission.SERVICES_DOCTORS, {Action.READ}))
    ],
)
def get_all_by_service_or_doctor(
    service_id_or_doctor_id: Annotated[UUID | int, Path(alias='serviceIdOrDoctorId')],
    is_service: Annotated[bool, Query(alias='service')],
    is_doctor: Annotated[bool, Query(alias='doctor')],
    *,
    service_service: ServiceServiceDependency,
    doctor_service: DoctorServiceDependency,
    service_doctor_service: ServiceDoctorServiceDependency,
) -> list[ServiceDoctor]:
    '''Get all service-doctors by service or doctor.

    Args:
    * serviceIdOrDoctorId (UUID | int): Service or doctor id.
    * isService (bool): Flag to indicate if the id is a service id.
    * isDoctor (bool): Flag to indicate if the id is a doctor id.

    Raises:
    * HTTPException: HTTP error 400. Invalid combination of flags.
    * HTTPException: HTTP error 404. Service not found.
    * HTTPException: HTTP error 404. Doctor not found.
    * HTTPException: HTTP error 403. Insufficient permissions.

    Returns:
    * list[ServiceDoctor]: List of service-doctors.
    '''
    if is_service and is_doctor:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='No se puede indicar ambas opciones',
        )

    if is_service and isinstance(service_id_or_doctor_id, UUID):
        if not service_service.contains(service_id_or_doctor_id):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail='El servicio indicado no existe'
            )

        return service_doctor_service.get_all_by_service(  # type: ignore
            service_id_or_doctor_id
        )

    if is_doctor and isinstance(service_id_or_doctor_id, int):
        if not doctor_service.contains(service_id_or_doctor_id):
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail='El médico indicado no existe'
            )

        return service_doctor_service.get_all_by_doctor(  # type: ignore
            service_id_or_doctor_id
        )

    return []


@router.post(
    '/',
    responses={
        HTTP_200_OK: {'model': ServiceDoctor},
        HTTP_201_CREATED: {'model': ServiceDoctor},
    },
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
    * ServiceDoctor: Service-doctor created or updated according to hierarchy.
    '''

    if not doctor_service.contains(
        service_doctor_in.doctor_id
    ) or not doctor_service.is_active(service_doctor_in.doctor_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El médico indicado no existe'
        )

    if not service_service.contains(
        service_doctor_in.service_id
    ) or not service_service.is_active(service_doctor_in.service_id):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El servicio indicado no existe'
        )

    if service_doctor_list := service_doctor_service.get_all_by_service_and_doctor(
        service_doctor_in.service_id, service_doctor_in.doctor_id
    ):
        try:
            service_doctor_service.check_session_and_service_type_hierarchy(
                service_doctor_in.session,
                service_doctor_in.service_type,
                service_doctor_list,
            )
        except SessionConflict as error:
            raise HTTPException(
                status_code=HTTP_409_CONFLICT,
                detail='Ya existe un médico asociado al servicio indicado',
            ) from error
        except MixingSession:
            service_doctor_updated = service_doctor_service.update_doctor_session(
                service_doctor_list[0], Session.FULL_DAY
            )

            return JSONResponse(  # type: ignore
                status_code=HTTP_200_OK,
                content={
                    'id': str(service_doctor_updated.id),
                    'serviceId': str(service_doctor_updated.service_id),
                    'doctorId': service_doctor_updated.doctor_id,
                    'serviceType': service_doctor_updated.service_type,
                    'session': service_doctor_updated.session,
                    'isActive': service_doctor_updated.is_active,
                },
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

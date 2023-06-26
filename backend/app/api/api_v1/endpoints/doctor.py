from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
)

from app.api.dependencies.auth import CurrentUserWithPermissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import Action, Permission
from app.schemas.medical.doctor import Doctor, DoctorCreate, DoctorUpdate
from app.services.medical import DoctorService
from app.services.user import UserService


router = APIRouter()

DoctorServiceDependency = Annotated[
    DoctorService, Depends(ServiceDependency(DoctorService))
]

UserServiceDependency = Annotated[UserService, Depends(ServiceDependency(UserService))]


@router.get(
    '/',
    dependencies=[Depends(CurrentUserWithPermissions(Permission.DOCTORS, {Action.READ}))],
)
def get_doctors(doctor_service: DoctorServiceDependency) -> list[Doctor]:
    '''Retrieve all doctors.

    Returns:
    * list[Doctor]: List of doctors.
    '''
    return doctor_service.get_all()  # type: ignore


@router.post(
    '/',
    status_code=HTTP_201_CREATED,
    dependencies=[
        Depends(CurrentUserWithPermissions(Permission.DOCTORS, {Action.CREATION}))
    ],
)
def create_doctor(
    doctor: Annotated[DoctorCreate, Body()],
    doctor_service: DoctorServiceDependency,
    user_service: UserServiceDependency,
) -> Doctor:
    '''Create a doctor.

    Args:
    * doctor (DoctorCreate): Creation data for a doctor via body parameter.

    Raises:
    * HTTPException: HTTP error 404. The doctor doesn't exist.
    * HTTPException: HTTP error 400. The doctor is already created.

    Returns:
    * Doctor: New doctor.
    '''
    if not user_service.contains(doctor.dni):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='El usuario a asignar no existe'
        )

    if not user_service.has_role(doctor.dni, 'médico'):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El usuario debe tener el rol de médico',
        )

    if doctor_service.contains(doctor.dni):
        raise HTTPException(
            status_code=HTTP_409_CONFLICT, detail='El médico ya está creado'
        )

    return doctor_service.create(doctor)  # type: ignore


@router.put(
    '/{dni}',
    dependencies=[
        Depends(CurrentUserWithPermissions(Permission.DOCTORS, {Action.UPDATE}))
    ],
)
def update_doctor(
    dni: Annotated[int, Path(gt=0)],
    doctor_in: Annotated[DoctorUpdate, Body(alias='doctorIn')],
    service: DoctorServiceDependency,
) -> Doctor:
    '''Update a doctor with a given DNI.

    Args:
    * dni (int): DNI given to retrieve the person via a path parameter.
    * doctor_in (DoctorUpdate): Doctor's data to be updated via body parameter.

    Raises:
    * HTTPException: HTTP error 404. The doctor wasn't found.

    Returns:
    * Doctor: The Doctor's data updated.
    '''
    if not (doctor := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f'El médico con la identificación {dni} no existe',
        )

    return service.update(db_obj=doctor, obj_in=doctor_in)  # type: ignore

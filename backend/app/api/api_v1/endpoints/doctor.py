from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

from app.api.dependencies.auth import get_current_user_with_permissions
from app.api.dependencies.services import ServiceDependency
from app.core.types import PermissionAction
from app.schemas.medical.doctor import Doctor, DoctorCreate, DoctorUpdate
from app.models.user import User as UserModel
from app.services.medical import DoctorService
from app.services.user import UserService


router = APIRouter()


@router.post('/', status_code=HTTP_201_CREATED)
def create_doctor(
    current_user: UserModel = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions('médicos', {PermissionAction.creation})
    ),
    doctor: DoctorCreate = Body(...),
    doctor_service: DoctorService = Depends(ServiceDependency(DoctorService)),
    user_service: UserService = Depends(ServiceDependency(UserService)),
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
            status_code=HTTP_400_BAD_REQUEST, detail='El médico ya está creado'
        )

    return doctor_service.create(doctor)  # type: ignore


@router.put('/{dni}')
def update_doctor(
    dni: int = Path(..., gt=0),
    doctor_in: DoctorUpdate = Body(...),
    current_user: UserModel = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions('médicos', {PermissionAction.update})
    ),
    service: DoctorService = Depends(ServiceDependency(DoctorService)),
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

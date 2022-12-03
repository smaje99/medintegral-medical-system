from typing import Any
from uuid import UUID

from fastapi import (
    APIRouter,
    Body,
    Depends,
    HTTPException
)
from starlette.status import HTTP_400_BAD_REQUEST

from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.person import get_person_if_no_user_exists
from app.models.user import User as UserModel
from app.schemas.person.person import Person
from app.schemas.user.user import User, UserCreate
from app.services.user import UserService, RoleService

from .user_deps import get_user_service, get_role_service


router = APIRouter()


@router.get('/me', response_model=User)
def read_user_me(
    current_user: UserModel = Depends(get_current_active_user)
) -> Any:
    '''Retrieve the current user.

    Args:
    * current_user (UserModel): Get the current user

    Returns:
    * User: Current user.
    '''
    return current_user


@router.post('/', response_model=User)
def create_user(
    person: Person = Depends(get_person_if_no_user_exists),
    role_id: UUID = Body(...),
    user_service: UserService = Depends(get_user_service),
    role_service: RoleService = Depends(get_role_service)
) -> Any:
    '''Create an user.

    Args:
    * dni (int): Identification number of the person to create an user.
    * role_id (UUID): Role ID to be assigned to the user.

    Raises:
    * HTTPException: HTTP 400. Person doesn't exist.
    * HTTPException: HTTP 400. User already exists.

    Returns:
    * User: User with personal data.
    '''
    if not role_service.get(role_id):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El rol a asignar al usuario no existe'
        )

    user_in = UserCreate(
        dni=person.dni,
        password=str(person.dni),
        role_id=role_id
    )

    return user_service.create(user_in)

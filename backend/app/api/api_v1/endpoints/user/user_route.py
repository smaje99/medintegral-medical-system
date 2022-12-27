from typing import Any
from uuid import UUID

from fastapi import (
    APIRouter,
    Body,
    Depends,
    HTTPException,
    Path
)
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)

from app.api.dependencies.auth import (
    get_current_active_user,
    get_current_user_with_permissions
)
from app.api.dependencies.person import get_person_if_no_user_exists
from app.core.types import PermissionAction
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


@router.post('/', response_model=User, status_code=HTTP_201_CREATED)
def create_user(
    current_user: User = Depends(  # pylint: disable=W0613
        get_current_user_with_permissions(
            'usuarios',
            {PermissionAction.creation}
        )
    ),
    person: Person = Depends(get_person_if_no_user_exists),
    role_id: UUID = Body(...),
    role_service: RoleService = Depends(get_role_service),
    user_service: UserService = Depends(get_user_service)
) -> Any:
    '''Create an user and notify the user's email address.

    Args:
    * dni (int): Identification number of the person to create an user.
    * role_id (UUID): Role ID to be assigned to the user.

    Raises:
    * HTTPException: HTTP 400. Person doesn't exist.
    * HTTPException: HTTP 400. User already exists.

    Returns:
    * User: User with personal data.
    '''
    if not role_service.contains(role_id):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El rol a asignar al usuario no existe'
        )

    user_in = UserCreate(
        dni=person.dni,
        password=str(person.dni),
        role_id=role_id
    )

    user = user_service.create(user_in)
    user_service.send_new_account_email(user=user)

    return user


@router.get('/{dni}', response_model=User)
def read_user(
    dni: int = Path(...),
    current_user: User = Depends(
        get_current_user_with_permissions('usuarios', {PermissionAction.read})
    ),
    user_service: UserService = Depends(get_user_service)
) -> Any:
    '''Retrieve a user by a given DNI.
    If the given DNI doesn't exist, raise an error.

    Args:
    * dni (int): DNI given to retrieve the user via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. User not found.

    Returns:
    * Any: The user with the given DNI.
    '''
    if dni == current_user.dni:
        return current_user

    if not (user := user_service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail='El usuario no existe'
        )

    return user

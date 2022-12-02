from typing import Any

from fastapi import APIRouter, Depends

from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.person import get_person_if_no_user_exists
from app.models.user import User as UserModel
from app.schemas.person.person import Person
from app.schemas.user.user import User, UserCreate
from app.services.user import UserService

from .user_deps import get_service


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
    service: UserService = Depends(get_service)
) -> Any:
    '''Create an user.

    Args:
    * dni (int): Identification number of the person to create an user.

    Raises:
    * HTTPException: HTTP 400. Person doesn't exist.
    * HTTPException: HTTP 400. User already exists.

    Returns:
    * User: User with personal data.
    '''
    user_in = UserCreate(dni=person.dni, password=str(person.dni))

    return service.create(user_in)

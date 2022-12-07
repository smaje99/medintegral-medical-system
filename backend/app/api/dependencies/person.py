from fastapi import (
    Body,
    Depends,
    HTTPException
)
from starlette.status import HTTP_400_BAD_REQUEST

from app.api.dependencies.services import ServiceDependency
from app.models.person import Person
from app.services.person import PersonService
from app.services.user import UserService

# Person service manager.
get_person_service = ServiceDependency(PersonService)

# User service manager.
get_user_service = ServiceDependency(UserService)


def get_person(
    dni: int = Body(...),
    service: PersonService = Depends(get_person_service)
) -> Person:
    '''Get a person if exists in the system.

    Args:
        dni (int): Identification number of the person to retrieve.
        service (PersonService): Person service dependency.

    Raises:
        HTTPException: HTTP 400. Person doesn't exist.

    Returns:
        Person: Person data.
    '''
    if not (person := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='La persona no existe en el sistema'
        )

    return person


def get_person_if_no_user_exists(
    person: Person = Depends(get_person),
    service: UserService = Depends(get_user_service)
) -> Person:
    '''Get a person if the user doesn't exist.

    Args:
        person (Person): Person dependency.
        service (UserService):User service dependency.

    Raises:
        HTTPException: HTTP 400. User already exists.

    Returns:
        Person: Person data.
    '''
    if service.contains(person.dni):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='El usuario ya existe en el sistema'
        )

    return person

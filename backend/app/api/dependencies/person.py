from typing import Annotated

from fastapi import Body, Depends, HTTPException
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND

from app.api.dependencies.services import ServiceDependency
from app.models.person import Person
from app.services.person import PersonService
from app.services.user import UserService

# Person service manager.
PersonServiceDependency = Annotated[
    PersonService, Depends(ServiceDependency(PersonService))
]

# User service manager.
UserServiceDependency = Annotated[UserService, Depends(ServiceDependency(UserService))]


def get_person(service: PersonServiceDependency, dni: int = Body()) -> Person:
    '''Get a person if exists in the system.

    Args:
        dni (int): Identification number of the person to retrieve.
        service (PersonService): Person service dependency.

    Raises:
        HTTPException: HTTP 404. Person not found.

    Returns:
        Person: Person data.
    '''
    if not (person := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La persona no existe en el sistema'
        )

    return person


# Handler for the person dependency
PersonDependency = Annotated[Person, Depends(get_person)]


def get_person_if_no_user_exists(
    person: PersonDependency, user_service: UserServiceDependency
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
    if user_service.contains(person.dni):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST, detail='El usuario ya existe en el sistema'
        )

    return person


# Handler for the person if no user exists dependency
PersonIfNoUserExistsDependency = Annotated[Person, Depends(get_person_if_no_user_exists)]

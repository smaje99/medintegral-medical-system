from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.api.dependencies.auth import get_current_user
from app.api.dependencies.services import ServiceDependency
from app.schemas.person.person import Person, PersonCreate, PersonUpdate
from app.services.person import PersonService


router = APIRouter()

PersonServiceDependency = Annotated[
    PersonService, Depends(ServiceDependency(PersonService))
]


@router.get('/{dni}')
def read_person(dni: Annotated[int, Path()], service: PersonServiceDependency) -> Person:
    '''Retrieve a person by a given DNI,
    if the given DNI doesn't exist then raise a error.

    Args:
    * dni (int): DNI given to retrieve the person via a path parameter
    * service (PersonService): Service with initialized database session.

    Raises:
    * HTTPException: HTTP error 404. The person wasn't found.

    Returns:
    * Person: The person with the given DNI.
    '''
    if not (person := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f'La persona con la identificación {dni} no existe',
        )

    return person  # type: ignore


@router.get('/', dependencies=[Depends(get_current_user)])
def read_people(
    service: PersonServiceDependency,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query()] = 50,
) -> list[Person]:
    '''Retrieve a people list.

    Args:
    * skip (int): Start cut of subset of people via query parameter.
        Defaults to 0.
    * limit (int): Number of people within the subset via query parameter.
        Defaults to 50.
    * service (PersonService): Service with initialized database session.
    * current_user (User): Get the current user in the system.

    Returns:
    * list[Person]: Specified subset of people.
    '''

    return service.get_all(skip=skip, limit=limit)  # type: ignore


@router.post('/', status_code=HTTP_201_CREATED)
def create_person(
    person_in: Annotated[PersonCreate, Body()],
    service: PersonServiceDependency,
) -> Person:
    '''Create a person

    Args:
    * person_in (PersonCreate): Creation data for a person via body parameter.
    * service (PersonService): Service with initialized database session.

    Returns:
    * Person: The Person's data created.
    '''
    return service.create(person_in)  # type: ignore


@router.put('/{dni}', dependencies=[Depends(get_current_user)])
def update_person(
    dni: Annotated[int, Path()],
    person_in: Annotated[PersonUpdate, Body()],
    service: PersonServiceDependency,
) -> Person:
    '''Update a person with a given DNI.

    Args:
    * dni (int): DNI given to retrieve the person via a path parameter.
    * person_in (PersonUpdate): Person's data to be updated via body parameter.
    * service (PersonService): Service with initialized database session.
    * current_user (User): Get the current user in the system.

    Raises:
    * HTTPException: HTTP error 404. The person wasn't found.

    Returns:
    * Person: The Person's data updated.
    '''
    if not (person := service.get(dni)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=f'La persona con la identificación {dni} no existe',
        )

    return service.update(db_obj=person, obj_in=person_in)  # type: ignore

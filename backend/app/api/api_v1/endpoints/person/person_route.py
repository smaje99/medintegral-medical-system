from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.api.dependencies.auth import get_current_user
from app.models.user import User
from app.schemas.person.person import Person, PersonCreate, PersonUpdate
from app.services.person import PersonService

from .person_deps import get_service


router = APIRouter()


@router.get('/{dni}')
def read_person(
    dni: int = Path(...), service: PersonService = Depends(get_service)
) -> Person:
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


@router.get('/')
def read_people(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50),
    service: PersonService = Depends(get_service),
    current_user: User = Depends(get_current_user),  # pylint: disable=W0613
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
    person_in: PersonCreate = Body(...), service: PersonService = Depends(get_service)
) -> Person:
    '''Create a person

    Args:
    * person_in (PersonCreate): Creation data for a person via body parameter.
    * service (PersonService): Service with initialized database session.

    Returns:
    * Person: The Person's data created.
    '''
    return service.create(person_in)  # type: ignore


@router.put('/{dni}')
def update_person(
    dni: int = Path(...),
    person_in: PersonUpdate = Body(...),
    service: PersonService = Depends(get_service),
    current_user: User = Depends(get_current_user),  # pylint: disable=W0613
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

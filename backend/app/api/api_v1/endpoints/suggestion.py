from uuid import UUID

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Query
from starlette.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND

from app.api.dependencies.services import ServiceDependency
from app.schemas.suggestion.suggestion import Suggestion, SuggestionCreate
from app.services.suggestion import SuggestionService


router = APIRouter()


@router.get('/{id}')
def read_suggestion(
    id: UUID = Path(...),  # pylint: disable=C0103, W0622
    service: SuggestionService = Depends(ServiceDependency(SuggestionService)),
) -> Suggestion:
    '''Retrieve a suggestion using a given ID,
    if the given ID doesn't exist then raise a error.

    Args:
    * id (UUID): ID given to retrieve the suggestion via a path parameter.

    Raises:
    * HTTPException: HTTP error 404. The suggestion wasn't found.

    Returns:
    * Suggestion: The suggestion with the given ID.
    '''
    if not (suggestion := service.get(id)):
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail='La sugerencia no existe'
        )

    return suggestion  # type: ignore


@router.get('/')
def read_suggestions(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50),
    pinned: bool = Query(default=False),
    service: SuggestionService = Depends(ServiceDependency(SuggestionService)),
) -> list[Suggestion]:
    '''Retrieve a suggestions list.

    Args:
    * skip (int): Start cut of subset of suggestions via query parameter.
        Defaults to 0.
    * limit (int): Number of suggestions within the subset via query parameter.
        Defaults to 50.
    * pinned (int): Indicates if suggestions should be pinned.
        Defaults to False.

    Returns:
    * list[Suggestion]: Specified subset of suggestions.
    '''
    if pinned:
        return service.get_all_pinned()  # type: ignore

    return service.get_all(skip=skip, limit=limit)  # type: ignore


@router.post('/', status_code=HTTP_201_CREATED)
def create_suggestion(
    suggestion_in: SuggestionCreate = Body(...),
    service: SuggestionService = Depends(ServiceDependency(SuggestionService)),
) -> Suggestion:
    '''Create a suggestion

    Args:
    * suggestion_in (SuggestionCreate): Creation data for a suggestion via
        body parameter.

    Returns:
    * Suggestion: The Suggestion's data created.
    '''
    return service.create(suggestion_in)  # type: ignore


@router.patch(
    '/{id}',
)
def modify_pinned(
    id: UUID = Path(...),  # pylint: disable=C0103, W0622
    pinned: bool = Body(...),
    service: SuggestionService = Depends(ServiceDependency(SuggestionService)),
) -> Suggestion:
    '''Modify the pinning of a suggestion given an ID.
    There can only be three pinned suggestions.

    Args:
    * id (UUID): Given ID of a suggestion to pin vin path parameter.
    * pinned (bool): Pinned state for suggestion via body parameter.

    Raises:
    * HTTPException: HTTP error 400. There are more than three
        pinned suggestions.

    Returns:
    * Suggestion: Suggestion with modified pinned.
    '''
    return service.modify_pinned(id, pinned)  # type: ignore

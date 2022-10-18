from typing import Any
from uuid import UUID

from fastapi import (
    APIRouter,
    Body,
    Depends,
    HTTPException,
    Path,
    Query
)
from starlette.status import (
    HTTP_201_CREATED,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_404_NOT_FOUND
)

from app.core.exceptions import PinnedSuggestionException
from app.schemas.suggestion import Suggestion, SuggestionCreate
from app.services.suggestion import SuggestionService

from .suggestion_deps import get_suggestion_service


router = APIRouter()


@router.get('/{id}', response_model=Suggestion)
def read_suggestion(
    id: UUID = Path(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    '''Retrieve a suggestion using a given ID,
    if the given ID doesn't exist then raise a error.

    Args:
    * id (UUID): ID given to retrieve the suggestion via a path parameter
    * service (SuggestionService): Service with initialized database session.
        Defaults to Depends(get_suggestion_service).

    Raises:
    * HTTPException: HTTP error 404. The suggestion wasn't found.

    Returns:
    * Suggestion: The suggestion with the given ID.
    '''
    if not (suggestion := service.get(id)):
         raise HTTPException(
             status_code=HTTP_404_NOT_FOUND,
             detail='La sugerencia no existe'
         )

    return suggestion


@router.get('/', response_model=list[Suggestion])
def read_suggestions(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    '''Retrieve a suggestion list.

    Args:
    * skip (int): Start cut of subset of suggestions via query parameter. Defaults to 0.
    * limit (int): Number of suggestions within the subset via query parameter. Defaults to 50.
    * service (SuggestionService): Service with initialized database session.
        Defaults to Depends(get_suggestion_service).

    Returns:
    * list[Suggestion]: Specified subset of suggestions.
    '''

    return service.get_all(skip=skip, limit=limit)


@router.post('/', response_model=Suggestion, status_code=HTTP_201_CREATED)
def create_suggestion(
    suggestion_in: SuggestionCreate = Body(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    '''Create a suggestion

    Args:
    * suggestion_in (SuggestionCreate): Creation data for a suggestion via body parameter.
    * service (SuggestionService): Service with initialized database session.
        Defaults to Depends(get_suggestion_service).

    Returns:
    * Suggestion: The Suggestion's data created.
    '''
    return service.create(suggestion_in)


@router.patch('/{id}', response_model=Suggestion)
def modify_pinned(
    id: UUID = Path(...),
    pinned: bool = Body(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    '''Modify the pinning of a suggestion given an ID.
    There can only be three pinned suggestions.

    Args:
    * id (UUID): Given ID of a suggestion to pin vin path parameter.
    * pinned (bool): Pinned state for suggestion via body parameter.
    * service (SuggestionService): Service with initialized database session.
        Defaults to Depends(get_suggestion_service).

    Raises:
    * HTTPException: HTTP error 406. There are more than three pinned suggestions.

    Returns:
    * Suggestion: Suggestion with modified pinned.
    '''
    try:
        suggestion = service.modify_pinned(id, pinned)
    except PinnedSuggestionException as e:
        raise HTTPException(
            status_code=HTTP_406_NOT_ACCEPTABLE,
            detail=str(e)
        ) from e

    return suggestion

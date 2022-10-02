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
    HTTP_400_BAD_REQUEST,
    HTTP_406_NOT_ACCEPTABLE,
    HTTP_404_NOT_FOUND
)

from core.exceptions import PinnedSuggestionException
from schemas.suggestion import Suggestion, SuggestionCreate
from services.suggestion import SuggestionService

from .suggestion_deps import get_suggestion_service


router = APIRouter()


@router.get('/{id}', response_model=Suggestion)
def read_suggestion(
    id: UUID = Path(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
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
    if skip >= limit:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail=f'El limite de datos de la consulta debe ser mayor a {skip}'
        )

    return service.get_all(skip=skip, limit=limit)


@router.post('/', response_model=Suggestion, status_code=HTTP_201_CREATED)
def create_suggestion(
    suggestion_in: SuggestionCreate = Body(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    return service.create(suggestion_in)


@router.patch('/{id}', response_model=Suggestion)
def modify_pinned(
    id: UUID = Path(...),
    pinned: bool = Body(...),
    service: SuggestionService = Depends(get_suggestion_service)
) -> Any:
    try:
        suggestion = service.modify_pinned(id, pinned)
    except PinnedSuggestionException as e:
        raise HTTPException(
            status_code=HTTP_406_NOT_ACCEPTABLE,
            detail=str(e)
        ) from e

    return suggestion

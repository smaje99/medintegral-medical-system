from typing import Annotated

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, Path

from app.context.person.domain import Person, PersonId
from app.context.person.infrastructure.http.api_v1.controllers import (
  PersonGetByIdController,
)


__all__ = ('router',)


router = APIRouter()


@router.get('/{person_id}')
@inject
async def read_person_by_id(  # noqa: D417
  person_id: Annotated[PersonId, Path()],
  controller: PersonGetByIdController = Depends(  # noqa: B008
    Provide['person.person_get_by_id_controller']
  ),
) -> Person:
  '''Retrieve a person by its id.

  Args:
  * person_id (PersonId): Person id.

  Raises:
  * PersonNotFound: If the person was not found.

  Returns:
  * Person: person retrieved.
  '''
  return await controller(person_id)

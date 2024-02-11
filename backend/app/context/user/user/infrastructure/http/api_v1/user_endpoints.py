from typing import Annotated

from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Body, Depends
from starlette.status import HTTP_201_CREATED

from app.context.person.domain import PersonSaveDTO
from app.context.user.user.domain import UserSaveDto
from app.context.user.user.infrastructure.http.api_v1.controllers import (
  UserPostController,
  UserPostResponse,
)


__all__ = ('router',)


router = APIRouter()


@router.post('/', status_code=HTTP_201_CREATED)
@inject
async def create_user(  # noqa: D417
  user_in: Annotated[UserSaveDto, Body(alias='userIn')],
  person_in: Annotated[PersonSaveDTO | None, Body(alias='personIn')] = None,
  *,
  controller: UserPostController = Depends(  # noqa: B008
    Provide['user.user.user_post_controller']
  ),
) -> UserPostResponse:
  '''Create a new person with a associated user.

  If the person already exists, the user will be associated with it.

  Args:
  * userIn (UserSaveDto): User to save.
  * personIn (PersonSaveDTO): Person to save.

  Raises:
  * UserAlreadyExists: If a user with the same ID already exists.
  * PersonUnderage: If the person is underage.
  * PersonNotFound: If the user was not found in people list.
  * RoleNotFound: If the role was not found.

  Returns:
  * UserPostResponse: Associated user created.
  '''
  return await controller(user_in, person_in)

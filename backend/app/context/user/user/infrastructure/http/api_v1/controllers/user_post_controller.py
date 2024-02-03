import contextlib

from starlette.status import HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

from .user_dto import UserPostResponse
from app.context.person.application import PersonCreator
from app.context.person.domain import PersonSaveDTO
from app.context.person.domain.person_errors import PersonAlreadyExists, PersonNotFound
from app.context.user.role.domain.role_errors import RoleNotFound
from app.context.user.user.application import UserCreator
from app.context.user.user.domain import UserSaveDto
from app.context.user.user.domain.user_errors import UserAlreadyExists
from app.core.errors import HTTPException


__all__ = ('UserPostController',)


class UserPostController:
  '''User post controller.'''

  def __init__(self, user_creator: UserCreator, person_creator: PersonCreator):
    '''User post controller constructor.

    Args:
        user_creator (UserCreator): User creator.
        person_creator (PersonCreator): Person creator.
    '''
    self.user_creator = user_creator
    self.person_creator = person_creator

  async def __call__(
    self, user_in: UserSaveDto, person_in: PersonSaveDTO
  ) -> UserPostResponse:
    """Create a new person with a associated user.

    If the person already exists, it'll only proceed
    to create the associated user.

    Args:
        user_in (UserSaveDto): User to save.
        person_in (PersonSaveDTO): Person to save.

    Returns:
        UserPostResponse: Associated user created.
    """
    try:
      with contextlib.suppress(PersonAlreadyExists):
        await self.person_creator(person_in)

      user = await self.user_creator(user_in)

      return UserPostResponse.model_validate(user)
    except UserAlreadyExists as error:
      raise HTTPException(
        status_code=HTTP_409_CONFLICT, message=error.message, error_type=error
      ) from error
    except (PersonNotFound, RoleNotFound) as error:
      raise HTTPException(
        status_code=HTTP_404_NOT_FOUND, message=error.message, error_type=error
      ) from error

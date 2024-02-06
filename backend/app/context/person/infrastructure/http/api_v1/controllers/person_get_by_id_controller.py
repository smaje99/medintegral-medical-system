from starlette.status import HTTP_404_NOT_FOUND

from app.context.person.application import PersonFinderById
from app.context.person.domain import Person, PersonId
from app.context.person.domain.person_errors import PersonNotFound
from app.core.errors import HTTPException


class PersonGetByIdController:
  '''Person Get by Id Controller.'''

  def __init__(self, person_finder: PersonFinderById):
    '''Person Get by Id Controller constructor.'''
    self.person_finder = person_finder

  async def __call__(self, person_id: PersonId) -> Person:
    '''Person Get by Id Controller call.'''
    try:
      return await self.person_finder(person_id)
    except PersonNotFound as error:
      raise HTTPException(
        status_code=HTTP_404_NOT_FOUND, message=error.message, error_type=error
      ) from error

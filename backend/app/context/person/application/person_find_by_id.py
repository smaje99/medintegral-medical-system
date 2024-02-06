from app.context.person.domain import Person, PersonId, PersonRepository
from app.context.person.domain.person_errors import PersonNotFound


__all__ = ('PersonFinderById',)


class PersonFinderById:
  '''Person Finder by Id.'''

  def __init__(self, repository: PersonRepository):
    '''Person Finder by Id constructor.'''
    self.repository = repository

  async def __call__(self, person_id: PersonId) -> Person:
    '''Person Finder by Id call.

    Args:
      person_id (PersonId): Person Id.

    Raises:
      PersonNotFound: If person not found.

    Returns:
      Person: Person.
    '''
    if (person := await self.repository.find(person_id)) is None:
      raise PersonNotFound(person_id)

    return person

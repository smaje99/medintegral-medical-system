from abc import ABCMeta, abstractmethod

from app.context.person.domain.objects import PersonId
from app.context.person.domain.person import Person
from app.context.person.domain.person_dto import PersonSaveDTO


__all__ = ('PersonRepository',)


class PersonRepository(metaclass=ABCMeta):
  '''Person repository interface.'''

  @abstractmethod
  async def save(self, person_in: PersonSaveDTO) -> Person:
    '''Save a new person.

    Args:
        person_in (PersonSaveDTO): Person to save.

    Returns:
        Person: Saved person.
    '''

  @abstractmethod
  async def contains(self, person_id: PersonId) -> bool:
    '''Check if a person exists.

    Args:
        person_id (PersonId): Person id.

    Returns:
        bool: True if person exists, False otherwise.
    '''

  @abstractmethod
  async def find(self, person_id: PersonId) -> Person | None:
    '''Find a person by id.

    Args:
        person_id (PersonId): Person id.

    Returns:
        Person: Found person.
    '''

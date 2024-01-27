from app.context.person.domain import Person, PersonRepository, PersonSaveDTO
from app.context.person.domain.person_errors import PersonAlreadyExists


__all__ = ('RoleCreator',)


class RoleCreator:
  '''Person creator.'''

  def __init__(self, repository: PersonRepository) -> None:
    '''Person creator constructor.

    Args:
        repository (PersonRepository): Person repository.
    '''
    self.__repository = repository

  async def __call__(self, person_in: PersonSaveDTO) -> Person:
    '''Implementation of the Person creation use case.

    Args:
        person_in (PersonSaveDTO): Person to create.

    Raises:
      PersonAlreadyExists: If a person with the same name already exists.

    Returns:
        Person: Created person.
    '''
    if await self.__repository.contains(person_in.dni):
      raise PersonAlreadyExists.from_id(person_in.dni)

    return await self.__repository.save(person_in)

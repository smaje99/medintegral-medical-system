from typing import override

from .orm_person_dao import OrmPersonDao
from .orm_person_entity import OrmPersonEntity
from app.context.person.domain import Person, PersonId, PersonRepository, PersonSaveDTO


class OrmPersonRepository(PersonRepository):
  '''ORM Person Repository.'''

  def __init__(self, dao: OrmPersonDao):
    '''ORM Person Repository constructor.

    Args:
        dao (OrmPersonDao): ORM Person DAO.
    '''
    self.__dao = dao

  @override
  async def save(self, person_in: PersonSaveDTO) -> Person:
    obj_in_person = person_in.model_dump()
    orm_person = OrmPersonEntity(**obj_in_person)
    db_person = await self.__dao.save(orm_person)

    person = Person.model_validate(db_person)
    person.blood_type = db_person.blood_with_rh

    return person

  @override
  async def contains(self, person_id: PersonId) -> bool:
    return await self.__dao.exists(person_id)

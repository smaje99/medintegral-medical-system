from typing import override

from app.context.user.user.domain import User, UserId, UserRepository, UserSaveDto
from app.context.user.user.infrastructure.persistence.sqlalchemy import (
  OrmUserDao,
  OrmUserEntity,
)


class OrmUserRepository(UserRepository):
  '''ORM User Repository.'''

  def __init__(self, dao: OrmUserDao):
    '''ORM User Repository constructor.

    Args:
        dao (OrmUserDao): ORM User DAO.
    '''
    self.__dao = dao

  @override
  async def save(self, user_in: UserSaveDto) -> User:
    obj_in_user = user_in.model_dump()
    orm_user = OrmUserEntity(**obj_in_user)
    db_user = self.__dao.save(orm_user)

    return User.model_validate(db_user)

  @override
  async def contains(self, user_id: UserId) -> bool:
    return await self.__dao.exists(user_id)

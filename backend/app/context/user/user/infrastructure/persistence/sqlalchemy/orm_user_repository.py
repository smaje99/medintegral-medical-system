from typing import override

from app.context.user.user.domain import User, UserId, UserRepository, UserSaveDto
from app.context.user.user.infrastructure.persistence.sqlalchemy import (
  OrmUserDao,
  OrmUserEntity,
)
from app.core.security.pwd import get_password_hash


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
    password = obj_in_user.pop('password', None)
    obj_in_user['hashed_password'] = get_password_hash(password)

    orm_user = OrmUserEntity(**obj_in_user)
    db_user = await self.__dao.save(orm_user)

    return User(
      id=db_user.id,
      fullname=f'{db_user.person.name} {db_user.person.surname}'.title(),
      username=db_user.username,
      email=db_user.person.email,
      hashed_password=db_user.hashed_password,
      is_superuser=db_user.is_superuser,
      is_active=db_user.is_active,
      image=db_user.image,
      role=db_user.role.name,
      created_at=db_user.created_at,
      modified_at=db_user.modified_at,
    )

  @override
  async def contains(self, user_id: UserId) -> bool:
    return await self.__dao.exists(user_id)

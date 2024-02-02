from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.schema import ForeignKey
from sqlalchemy.sql.expression import false

from app.database.base import Base
from app.database.mapped import (
  required_boolean,
  required_text,
  required_uuid,
  text,
  text_pk,
)
from app.database.mixins import IsActiveMixin, TimestampMixin


if TYPE_CHECKING:
  from app.context.person.infrastructure.persistence.sqlalchemy import OrmPersonEntity
  from app.context.user.role.infrastructure.persistence.sqlalchemy import OrmRoleEntity


__all__ = ('OrmUserEntity',)


class OrmUserEntity(Base, IsActiveMixin, TimestampMixin):
  '''User entity of ORM.'''

  id: Mapped[text_pk] = mapped_column(
    ForeignKey('person.person.dni', onupdate='CASCADE'),
  )

  username: Mapped[required_text] = mapped_column(unique=True)

  hashed_password: Mapped[required_text]

  is_superuser: Mapped[required_boolean] = mapped_column(server_default=false())

  image: Mapped[text]

  role_id: Mapped[required_uuid] = mapped_column(ForeignKey('user.role.id'), unique=True)

  person: Mapped['OrmPersonEntity'] = relationship(
    back_populates='user', single_parent=True
  )

  role: Mapped['OrmRoleEntity'] = relationship(back_populates='users')

  __table_args__ = {'schema': 'user'}

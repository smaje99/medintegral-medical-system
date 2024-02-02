from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import String

from app.database import Base
from app.database.mapped import required_text
from app.database.mixins import IdentifierMixin


if TYPE_CHECKING:
  from app.context.user.user.infrastructure.persistence.sqlalchemy import OrmUserEntity


__all__ = ('OrmRoleEntity',)


class OrmRoleEntity(Base, IdentifierMixin):
  '''Role entity of ORM.'''

  name: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)

  description: Mapped[required_text]

  users: Mapped[list['OrmUserEntity']] = relationship(back_populates='role')

  __table_args__ = {'schema': 'user'}

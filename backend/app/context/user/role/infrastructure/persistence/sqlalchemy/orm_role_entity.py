from uuid import UUID

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.types import String, Text, Uuid

from app.database import Base
from app.database.mixins import IdentifierMixin


__all__ = ('OrmRoleEntity',)


class OrmRoleEntity(Base, IdentifierMixin):
  '''Role entity of ORM.'''

  name: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)

  description: Mapped[str] = mapped_column(Text, nullable=False)

  __table_args__ = {'schema': 'user'}

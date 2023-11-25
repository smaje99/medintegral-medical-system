from uuid import UUID

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.types import String, Text, Uuid

from app.database import Base


__all__ = ('OrmRoleEntity',)


class OrmRoleEntity(Base):
  '''Role entity of ORM.'''

  id: Mapped[UUID] = mapped_column(
    Uuid, primary_key=True, nullable=False, server_default=func.uuid_generate_v4()
  )

  name: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)

  description: Mapped[str] = mapped_column(Text, nullable=False)

  __table_args__ = {'schema': 'user'}

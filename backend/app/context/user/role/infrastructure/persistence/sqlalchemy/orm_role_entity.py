from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import String

from app.database import Base
from app.database.mapped import required_text
from app.database.mixins import IdentifierMixin


__all__ = ('OrmRoleEntity',)


class OrmRoleEntity(Base, IdentifierMixin):
  '''Role entity of ORM.'''

  name: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)

  description: Mapped[required_text]

  __table_args__ = {'schema': 'user'}

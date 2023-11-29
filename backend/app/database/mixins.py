from uuid import UUID

from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.types import Uuid


__all__ = ('IdentifierMixin',)


class IdentifierMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with a unique identifier.'''

  id: Mapped[UUID] = mapped_column(
    Uuid,
    primary_key=True,
    nullable=False,
    server_default=func.uuid_generate_v4(),
  )
  '''Unique identifier of the instance.'''

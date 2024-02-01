from datetime import datetime
from uuid import UUID

from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import true
from sqlalchemy.types import TIMESTAMP, Boolean, Uuid


__all__ = ('IdentifierMixin', 'TimestampMixin', 'IsActiveMixin')


class IdentifierMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with a unique identifier.'''

  id: Mapped[UUID] = mapped_column(
    Uuid,
    primary_key=True,
    nullable=False,
    server_default=func.uuid_generate_v4(),
  )
  '''Unique identifier of the instance.'''


class TimestampMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with a timestamp.'''

  created_at: Mapped[datetime] = mapped_column(
    TIMESTAMP(timezone=True),
    nullable=False,
    server_default=func.current_timestamp(),
  )
  '''Timestamp of the creation of the instance.'''

  updated_at: Mapped[datetime] = mapped_column(
    TIMESTAMP(timezone=True),
    nullable=False,
    server_default=func.current_timestamp(),
    onupdate=func.current_timestamp(),
  )
  '''Timestamp of the last update of the instance.'''


class IsActiveMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with an active status.'''

  is_active: Mapped[bool] = mapped_column(
    Boolean,
    nullable=False,
    server_default=true(),
  )
  '''Status of the instance.'''

from sqlalchemy.orm import Mapped, MappedAsDataclass, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import true

from .mapped import required_boolean, required_timestamp_default, uuid_pk


__all__ = ('IdentifierMixin', 'TimestampMixin', 'IsActiveMixin')


class IdentifierMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with a unique identifier.'''

  id: Mapped[uuid_pk]
  '''Unique identifier of the instance.'''


class TimestampMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with a timestamp.'''

  created_at: Mapped[required_timestamp_default]
  '''Timestamp of the creation of the instance.'''

  modified_at: Mapped[required_timestamp_default] = mapped_column(
    onupdate=func.current_timestamp(),
  )
  '''Timestamp of the last update of the instance.'''


class IsActiveMixin(MappedAsDataclass, init=False):
  '''Common mixin for entities with an active status.'''

  is_active: Mapped[required_boolean] = mapped_column(
    server_default=true(),
  )
  '''Status of the instance.'''

from sqlalchemy import Column, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.database.base import Base


class Permission(Base):
    ''' Permission model. Records of permissions in the system.'''

    # Permission ID.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4()
    )

    # Permission name.
    name = Column(Text, nullable=False, unique=True)

    __table_args__ = {'schema': 'user'}

from typing import TYPE_CHECKING

from sqlalchemy import Column, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


if TYPE_CHECKING:
    from .user import User


class Role(Base):
    '''Role model. Records of roles in the system.'''

    # Role ID.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # Role name.
    name = Column(Text, nullable=False, unique=True)

    # User relationship many to one.
    users: list['User'] = relationship('User', back_populates='role')  # type: ignore

    __table_args__ = {'schema': 'user'}

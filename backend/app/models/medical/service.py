from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, DECIMAL, Integer, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression, func

from app.database.base import Base


if TYPE_CHECKING:
    from .specialty import Specialty


class Service(Base):
    '''Service model. Records of medical services in the system.'''

    # Medical service identifier.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # Name of the medical service.
    name = Column(Text, unique=True, nullable=False)

    # Description of the medical service.
    description = Column(Text, nullable=False)

    # Cost of medical service offered at the I.P.S.
    cost = Column(DECIMAL, nullable=False, server_default='0')

    # Duration in minutes of medical service
    duration = Column(Integer, nullable=False, server_default='0')

    # Service status in the system.
    is_active = Column(Boolean, nullable=False, server_default=expression.true())

    # Identifier of the medical specialty associated with the service.
    specialty_id = Column(
        UUID(as_uuid=True), ForeignKey('medical.specialty.id'), nullable=False
    )

    # Specialty relationship many to one.
    specialty: 'Specialty' = relationship(  # type: ignore
        'Specialty', back_populates='services'
    )

    __table_args__ = {'schema': 'medical'}

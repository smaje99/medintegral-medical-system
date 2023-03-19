from typing import TYPE_CHECKING

from sqlalchemy import Column, Text
from sqlalchemy.dialects.postgresql import BYTEA, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base


if TYPE_CHECKING:
    from .service import Service


class Specialty(Base):
    '''Specialty model. Records of medical specialties in the system.'''

    # Medical specialty identifier.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # Name of the medical specialty.
    name = Column(Text, unique=True, nullable=False)

    # Description of the medical specialty.
    description = Column(Text, nullable=False)

    # Descriptive logo of the medical specialty in the I.P.S.
    image = Column(BYTEA)

    # Service relationship one to many.
    services: list['Service'] = relationship(  # type: ignore
        'Service', back_populates='specialty'
    )

    __table_args__ = {'schema': 'medical'}

from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Column, ForeignKey, Text
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.orm import relationship

from app.database.base import Base


if TYPE_CHECKING:
    from ..user import User


class Doctor(Base):
    '''Doctor model. Records of doctors in the system.'''

    # Identification number of the doctor according
    # to their identification document.
    dni = Column(
        BigInteger,
        ForeignKey('user.user.dni', onupdate='CASCADE'),
        primary_key=True,
        nullable=False,
    )

    # Doctor's professional card identifier.
    medical_license = Column(Text, nullable=False, unique=True)

    # Doctor signature base64 image binaries.
    signature = Column(BYTEA)

    # User relationship one to one.
    user: 'User' = relationship(  # type: ignore
        'User', back_populates='doctor', lazy='joined'
    )

    __table_args__ = {'schema': 'doctor'}

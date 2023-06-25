from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Column, ForeignKey, TEXT
from sqlalchemy.orm import relationship

from app.database.base import Base


if TYPE_CHECKING:
    from .service_doctor import ServiceDoctor
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

    # Doctor's signature path.
    signature = Column(TEXT)

    # User relationship one to one.
    user: 'User' = relationship(  # type: ignore
        'User', back_populates='doctor', lazy='joined'
    )

    # Service-Doctor relationship one to many.
    services_doctors: list['ServiceDoctor'] = relationship(  # type: ignore
        'ServiceDoctor', backref='service-doctor', lazy='joined'
    )

    __table_args__ = {'schema': 'medical'}

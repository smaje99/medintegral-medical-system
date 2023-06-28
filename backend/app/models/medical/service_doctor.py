from sqlalchemy import BigInteger, Boolean, Column, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import expression, func

from app.core.types import ServiceType, Session
from app.database.base import Base


class ServiceDoctor(Base):
    '''Service-Doctor model. Records of associated doctors
    with the I.P.S. medical services.
    '''

    # Doctor and service association identifier.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # Associated medical service identifier.
    service_id = Column(
        UUID(as_uuid=True), ForeignKey('medical.service.id'), nullable=False
    )

    # Associated doctor identifier.
    doctor_id = Column(BigInteger, ForeignKey('medical.doctor.dni'), nullable=False)

    # Defines whether the doctor offers the service
    # in-of-I.P.S. or out-of-I.P.S.
    service_type = Column(
        Enum(ServiceType, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
    )

    #  Defines whether the doctor offers the service
    # in the morning, afternoon or full day.
    session = Column(
        Enum(Session, values_callable=lambda obj: [e.value for e in obj]), nullable=False
    )

    # Record status in the system
    is_active = Column(Boolean, nullable=False, server_default=expression.true())

    __table_args__ = {'schema': 'medical'}

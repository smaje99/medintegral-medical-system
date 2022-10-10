from sqlalchemy import Column, Date, Enum, Integer, Text
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy_utils import EmailType, PhoneNumberType  # pyright: ignore

from core.types import BloodType, CivilStatus, DocumentType, Gender, RHFactor
from database.base import Base


class Person(Base):
    dni = Column(Integer, nullable=False, primary_key=True)
    name = Column(Text, nullable=False)
    surname = Column(Text, nullable=False)
    address = Column(Text)
    email = Column(EmailType, nullable=False, unique=True)  # pyright: ignore
    phone = Column(PhoneNumberType(), nullable=False)  # pyright: ignore
    gender = Column(
        Enum(Gender, values_callable=lambda obj: [e.value for e in obj]),  # pyright: ignore
        nullable=False
    )
    birthdate = Column(Date, nullable=False)
    document_type = Column(
        Enum(DocumentType, values_callable=lambda obj: [e.value for e in obj]),  # pyright: ignore
        nullable=False
    )
    blood_type = Column(Enum(BloodType))
    rh_factor = Column(
        Enum(RHFactor, values_callable=lambda obj: [e.value for e in obj])  # pyright: ignore
    )
    ethnicity = Column(Text)
    occupation = Column(Text)
    civil_status = Column(
        Enum(CivilStatus, values_callable=lambda obj: [e.value for e in obj])  # pyright: ignore
    )
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp()
    )
    modified_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp()
    )

    __table_args__ = { 'schema': 'person' }

from typing import TYPE_CHECKING

from sqlalchemy import Column, Date, Enum, BigInteger, Text
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy_utils import EmailType, PhoneNumberType  # pyright: ignore

from app.core.types import BloodType, CivilStatus, DocumentType, Gender, RHFactor
from app.database.base import Base


if TYPE_CHECKING:
    from app.models.user import User  # pyright: ignore


class Person(Base):
    ''' Person model. Registration of personal data of a person in the system. '''

    # Identification number of the person according to their identification document.
    dni = Column(BigInteger, nullable=False, primary_key=True)

    # Person's name.
    name = Column(Text, nullable=False)

    # Person's surname.
    surname = Column(Text, nullable=False)

    # Person's address.
    address = Column(Text)

    # Person's email.
    email = Column(EmailType, nullable=False, unique=True)  # pyright: ignore

    # Person's phone number.
    phone = Column(PhoneNumberType(), nullable=False)  # pyright: ignore

    # Person's gender.
    gender = Column(
        Enum(Gender, values_callable=lambda obj: [e.value for e in obj]),  # pyright: ignore
        nullable=False
    )

    # Person's birthdate.
    birthdate = Column(Date, nullable=False)

    # Type of person's identification document.
    document_type = Column(
        Enum(DocumentType, values_callable=lambda obj: [e.value for e in obj]),  # pyright: ignore
        nullable=False
    )

    # Person's blood type.
    blood_type = Column(Enum(BloodType))

    # Person's RH blood factor.
    rh_factor = Column(
        Enum(RHFactor, values_callable=lambda obj: [e.value for e in obj])  # pyright: ignore
    )

    # Ethnicity to which  the person belongs if any.
    ethnicity = Column(Text)

    # Person's occupation.
    occupation = Column(Text)

    # Person's civil status.
    civil_status = Column(
        Enum(CivilStatus, values_callable=lambda obj: [e.value for e in obj])  # pyright: ignore
    )

    # Date of creation of the person's record in the system.
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp()
    )

    # Date of the last modification to a person's registration data.
    modified_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp()
    )

    # User relationship one to one.
    user = relationship('User', uselist=False, back_populates='person')  # type: ignore

    __table_args__ = { 'schema': 'person' }

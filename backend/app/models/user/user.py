from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, ForeignKey, BigInteger, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression

from app.database.base import Base


if TYPE_CHECKING:
    from app.models.person import Person  # pyright: ignore


class User(Base):
    ''' User model. Records of users in the system. '''

    # Identification number of the person according to their identification document.
    dni = Column(
        BigInteger,
        ForeignKey('person.person.dni', onupdate='CASCADE'),
        primary_key=True,
        nullable=False
    )

    # User identifier name.
    username = Column(Text, nullable=False, unique=True)

    # Encrypted user password.
    hashed_password = Column(Text, nullable=False)

    # User status in the system.
    is_active = Column(Boolean, nullable=False, server_default=expression.true())

    # Person relationship one to one
    person = relationship('Person', back_populates='user')  # type: ignore

    __table_args__ = { 'schema': 'user' }

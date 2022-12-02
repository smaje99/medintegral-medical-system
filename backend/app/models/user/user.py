from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, ForeignKey, BigInteger, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression

from app.database.base import Base


if TYPE_CHECKING:
    from ..person.person import Person  # pyright: ignore  # noqa: F401


class User(Base):
    ''' User model. Records of users in the system. '''

    # Identification number of the person according
    # to their identification document.
    dni = Column(
        BigInteger,
        ForeignKey('person.person.dni', onupdate='CASCADE'),
        primary_key=True,
        nullable=False
    )

    # User identifier name.
    username = Column(Text, unique=True)

    # Encrypted user password.
    hashed_password = Column(Text, nullable=False)

    # User status in the system.
    is_active = Column(
        Boolean,
        nullable=False,
        server_default=expression.true()
    )

    # Person relationship one to one
    person = relationship(  # type: ignore
        'Person',
        back_populates='user',
        lazy='joined'
    )

    __table_args__ = {'schema': 'user'}

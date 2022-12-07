from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    BigInteger,
    Text
)
from sqlalchemy.dialects.postgresql import TIMESTAMP, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression, func

from app.database.base import Base


if TYPE_CHECKING:
    from ..person.person import Person  # pyright: ignore  # noqa: F401
    from .role import Role  # pyright: ignore  # noqa: F401


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

    # Role ID
    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey('user.role.id'),
        nullable=False
    )

    # Date of creation of the user's record in the system.
    created_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp()
    )

    # Date of the last modification to an user's registration data.
    modified_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp()
    )

    # Person relationship one to one
    person = relationship(  # type: ignore
        'Person',
        back_populates='user',
        lazy='joined'
    )

    # Role relationship many to one.
    role: 'Role' = relationship(  # type: ignore
        'Role',
        back_populates='users',
        lazy='joined'
    )

    __table_args__ = {'schema': 'user'}

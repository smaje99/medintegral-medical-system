from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, Column, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression, func

from app.core.types import PermissionAction
from app.database.base import Base


if TYPE_CHECKING:
    from .permission import Permission
    from .user import User


class UserPermission(Base):
    '''User Permission model. Records of user permissions in the system.'''

    # User Permission ID
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # User ID
    user_id = Column(BigInteger, ForeignKey('user.user.dni'), nullable=False)

    # Permission ID
    permission_id = Column(
        UUID(as_uuid=True), ForeignKey('user.permission.id'), nullable=False
    )

    # User Permission actions.
    action = Column(
        Enum(PermissionAction, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
    )

    # User Permission status in the system.
    is_active = Column(Boolean, nullable=False, server_default=expression.true())

    # Date of creation of the user permission's record in the system.
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=func.current_timestamp()
    )

    # Date of the last modification of an user permission's record.
    modified_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp(),
    )

    user: 'User' = relationship(  # type: ignore
        'User', lazy='joined', backref='userPermissions'
    )

    permission: 'Permission' = relationship(  # type: ignore
        'Permission', lazy='joined', backref='userPermissions'
    )

    __table_args__ = {'schema': 'user'}

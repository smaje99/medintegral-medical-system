from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import expression, func

from app.core.types import Action
from app.database.base import Base


if TYPE_CHECKING:
    from .permission import Permission
    from .role import Role


class RolePermission(Base):
    '''Role Permission model. Records of roles permissions in the system.'''

    # Role Permission ID
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4(),
    )

    # Role ID
    role_id = Column(UUID(as_uuid=True), ForeignKey('user.role.id'), nullable=False)

    # Permission ID
    permission_id = Column(
        UUID(as_uuid=True), ForeignKey('user.permission.id'), nullable=False
    )

    # Role Permission action.
    action = Column(
        Enum(Action, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
    )

    # Role Permission status in the system.
    is_active = Column(Boolean, nullable=False, server_default=expression.true())

    # Date of creation of the role permission's record in the system.
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=func.current_timestamp()
    )

    # Date of the last modification of an role permission's record.
    modified_at = Column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=func.current_timestamp(),
        onupdate=func.current_timestamp(),
    )

    role: 'Role' = relationship(  # type: ignore
        'Role', lazy='joined', backref='rolePermissions'
    )

    permission: 'Permission' = relationship(  # type: ignore
        'Permission', lazy='joined', backref='rolePermissions'
    )

    __table_args__ = {'schema': 'user'}

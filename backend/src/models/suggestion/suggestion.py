from sqlalchemy import Boolean, Column, String
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.sql import expression, func

from database import Base  # pyright: ignore

class Suggestion(Base):  # pyright: ignore
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4()
    )
    opinion = Column(String(500))
    pinned = Column(Boolean, server_default=expression.false(), index=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.current_timestamp())

    __table_args__ = { 'schema': 'suggestion' }

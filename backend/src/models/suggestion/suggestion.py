from sqlalchemy import Boolean, Column, String
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.sql import expression, func

from database import Base  # pyright: ignore

class Suggestion(Base):  # pyright: ignore
    ''' Suggestion model. Mailbox for anonymous suggestions from company users. '''

    # Suggestion ID.
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        server_default=func.uuid_generate_v4()
    )

    # Anonymous user feedback.
    opinion = Column(String(500))

    # Pinned suggestion. there can only be three pinned suggestions.
    pinned = Column(Boolean, server_default=expression.false(), index=True)

    # Creation of the suggestion record in the system.
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.current_timestamp())

    __table_args__ = { 'schema': 'suggestion' }

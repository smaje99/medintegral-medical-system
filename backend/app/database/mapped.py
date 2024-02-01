from datetime import date, datetime
from typing import Annotated
from uuid import UUID

from sqlalchemy.orm import mapped_column
from sqlalchemy.sql.functions import func
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean, Date, Text, Uuid


__all__ = (
  'required_boolean',
  'required_date',
  'required_text',
  'required_timestamp_default',
  'required_uuid',
  'text_pk',
  'text',
  'uuid_pk',
)


required_text = Annotated[str, mapped_column(Text, nullable=False)]

required_boolean = Annotated[bool, mapped_column(Boolean, nullable=False)]

required_timestamp_default = Annotated[
  datetime,
  mapped_column(
    TIMESTAMP(timezone=True), nullable=False, server_default=func.current_timestamp()
  ),
]

text_pk = Annotated[str, mapped_column(Text, primary_key=True, nullable=False)]

uuid_pk = Annotated[
  UUID,
  mapped_column(
    Uuid, primary_key=True, nullable=False, server_default=func.uuid_generate_v4()
  ),
]

required_uuid = Annotated[UUID, mapped_column(Uuid, nullable=False)]

text = Annotated[str, mapped_column(Text)]

required_date = Annotated[date, mapped_column(Date, nullable=False)]

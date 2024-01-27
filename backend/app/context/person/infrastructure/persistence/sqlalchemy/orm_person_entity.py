from datetime import date, datetime

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.types import TIMESTAMP, Date, Enum, String, Text

from app.context.person.domain.enums import (
  BloodType,
  CivilStatus,
  DocumentType,
  Gender,
  RHFactor,
)
from app.database import Base
from app.database.utils import enum_values_callable


__all__ = ('OrmPersonEntity',)


class OrmPersonEntity(Base):
  '''Person entity of SQLAlchemy ORM with PostgreSQL.'''

  dni: Mapped[str] = mapped_column(Text, primary_key=True, nullable=False)

  name: Mapped[str] = mapped_column(Text, nullable=False)

  surname: Mapped[str] = mapped_column(Text, nullable=False)

  address: Mapped[str] = mapped_column(Text)

  email: Mapped[str] = mapped_column(Text, nullable=False)

  phonenumber: Mapped[str] = mapped_column(String(28), nullable=False)

  gender: Mapped[Gender] = mapped_column(
    Enum(Gender, values_callable=enum_values_callable), nullable=False
  )

  birthdate: Mapped[date] = mapped_column(Date, nullable=False)

  document_type: Mapped[DocumentType] = mapped_column(
    Enum(DocumentType, values_callable=enum_values_callable), nullable=False
  )

  blood_type: Mapped[BloodType] = mapped_column(
    Enum(BloodType, values_callable=enum_values_callable)
  )

  rh_factor: Mapped[RHFactor] = mapped_column(
    Enum(RHFactor, values_callable=enum_values_callable)
  )

  ethnicity: Mapped[str] = mapped_column(Text)

  occupation: Mapped[str] = mapped_column(Text)

  civil_status: Mapped[CivilStatus] = mapped_column(
    Enum(CivilStatus, values_callable=enum_values_callable)
  )

  created_at: Mapped[datetime] = mapped_column(
    TIMESTAMP(timezone=True), server_default=func.current_timestamp(), nullable=False
  )

  modified_at: Mapped[datetime] = mapped_column(
    TIMESTAMP(timezone=True),
    server_default=func.current_timestamp(),
    onupdate=func.current_timestamp(),
    nullable=False,
  )

  __table_args__ = {'schema': 'person'}

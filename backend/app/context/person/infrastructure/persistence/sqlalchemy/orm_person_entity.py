from typing import TYPE_CHECKING

from sqlalchemy.dialects.postgresql.named_types import ENUM
from sqlalchemy.orm import (
  Mapped,
  column_property,
  mapped_column,
  relationship,
)
from sqlalchemy.sql import func
from sqlalchemy.sql.expression import cast
from sqlalchemy.sql.sqltypes import String, Text

from app.context.person.domain.enums import (
  BloodType,
  CivilStatus,
  DocumentType,
  Gender,
  RHFactor,
)
from app.database import Base
from app.database.mapped import required_date, required_text, text, text_pk
from app.database.mixins import TimestampMixin
from app.database.utils import enum_values_callable


if TYPE_CHECKING:
  from app.context.user.user.infrastructure.persistence.sqlalchemy import OrmUserEntity


__all__ = ('OrmPersonEntity',)


class OrmPersonEntity(Base, TimestampMixin):
  '''Person entity of SQLAlchemy ORM with PostgreSQL.'''

  dni: Mapped[text_pk]

  name: Mapped[required_text]

  surname: Mapped[required_text]

  address: Mapped[text]

  email: Mapped[required_text]

  phonenumber: Mapped[str] = mapped_column(String(28), nullable=False)

  gender: Mapped[Gender] = mapped_column(
    ENUM(Gender, values_callable=enum_values_callable), nullable=False
  )

  birthdate: Mapped[required_date] = mapped_column()

  document_type: Mapped[DocumentType] = mapped_column(
    ENUM(DocumentType, values_callable=enum_values_callable), nullable=False
  )

  blood_type: Mapped[BloodType] = mapped_column(ENUM(BloodType))

  rh_factor: Mapped[RHFactor] = mapped_column(
    ENUM(RHFactor, values_callable=enum_values_callable)
  )

  ethnicity: Mapped[text]

  occupation: Mapped[text]

  civil_status: Mapped[CivilStatus] = mapped_column(
    ENUM(CivilStatus, values_callable=enum_values_callable)
  )

  blood_with_rh = column_property(cast(blood_type, Text) + cast(rh_factor, Text))

  age = column_property(cast(func.age(birthdate), Text))

  user: Mapped['OrmUserEntity'] = relationship(back_populates='person')


  __table_args__ = {'schema': 'person'}

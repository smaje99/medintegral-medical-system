from typing import TYPE_CHECKING

from sqlalchemy.orm import (
  Mapped,
  column_property,
  mapped_column,
  object_session,
  relationship,
)
from sqlalchemy.sql import func, select
from sqlalchemy.sql.expression import cast
from sqlalchemy.types import Enum, String, Text

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
    Enum(Gender, values_callable=enum_values_callable), nullable=False
  )

  birthdate: Mapped[required_date]

  document_type: Mapped[DocumentType] = mapped_column(
    Enum(DocumentType, values_callable=enum_values_callable), nullable=False
  )

  blood_type: Mapped[BloodType] = mapped_column(
    Enum(BloodType, values_callable=enum_values_callable)
  )

  rh_factor: Mapped[RHFactor] = mapped_column(
    Enum(RHFactor, values_callable=enum_values_callable)
  )

  ethnicity: Mapped[text]

  occupation: Mapped[text]

  civil_status: Mapped[CivilStatus] = mapped_column(
    Enum(CivilStatus, values_callable=enum_values_callable)
  )

  blood_with_rh = column_property(blood_type + rh_factor)

  @property
  def age(self):
    """Person's age."""
    if (session := object_session(self)) is None:
      return None

    return session.scalar(select(cast(func.age(self.birthdate), Text).label('age')))

  user: Mapped['OrmUserEntity'] = relationship(back_populates='person')


  __table_args__ = {'schema': 'person'}

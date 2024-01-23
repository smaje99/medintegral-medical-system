'''create person table.

Revision ID: 90c17ba1ddfc
Revises: 7fa0e0452164
Create Date: 2024-01-22 18:25:01.788989

'''
from typing import Sequence, Union

from alembic import op
from sqlalchemy import Column, Date, PrimaryKeyConstraint, String, Text
from sqlalchemy.dialects.postgresql import ENUM, TIMESTAMP
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = '90c17ba1ddfc'
down_revision: Union[str, None] = '7fa0e0452164'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create person table.'''
  op.create_table(
    'person',
    Column('dni', Text, primary_key=True, nullable=False),
    Column('name', Text, nullable=False),
    Column('surname', Text, nullable=False),
    Column('address', Text, nullable=True),
    Column('email', Text, nullable=False),
    Column('phonenumber', String(28), nullable=False),
    Column('gender', ENUM(name='gender', create_type=False), nullable=False),
    Column('birthdate', Date, nullable=False),
    Column('document_type', ENUM(name='documenttype', create_type=False), nullable=False),
    Column('blood_type', ENUM(name='bloodtype', create_type=False), nullable=True),
    Column('rh_factor', ENUM(name='rhfactor', create_type=False), nullable=True),
    Column('ethnicity', Text, nullable=True),
    Column('occupation', Text, nullable=True),
    Column('civil_status', ENUM(name='civilstatus', create_type=False), nullable=True),
    Column(
      'created_at',
      TIMESTAMP(timezone=True),
      nullable=False,
      server_default=func.current_timestamp(),
    ),
    Column(
      'modified_at',
      TIMESTAMP(timezone=True),
      nullable=False,
      server_default=func.current_timestamp(),
      onupdate=func.current_timestamp(),
    ),
    PrimaryKeyConstraint('dni', name='pk_person'),
    schema='person',
  )
  op.create_index(
    op.f('idx_person_email'),
    table_name='person',
    columns=['email'],
    schema='person',
    if_not_exists=True,
  )


def downgrade() -> None:
  '''Drop person table and its indexes.'''
  op.drop_index(
    op.f('idx_person_email'), table_name='person', schema='person', if_exists=True
  )
  op.drop_table('person', schema='person')

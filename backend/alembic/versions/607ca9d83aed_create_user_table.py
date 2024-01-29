'''create user table.

Revision ID: 607ca9d83aed
Revises: 90c17ba1ddfc
Create Date: 2024-01-29 12:32:51.948566

'''
from typing import Sequence, Union

from alembic import op
from sqlalchemy.schema import (
  Column,
  ForeignKeyConstraint,
  PrimaryKeyConstraint,
  UniqueConstraint,
)
from sqlalchemy.sql.expression import false, true
from sqlalchemy.sql.functions import func
from sqlalchemy.sql.sqltypes import TIMESTAMP, Boolean, Text, Uuid


# revision identifiers, used by Alembic.
revision: str = '607ca9d83aed'
down_revision: Union[str, None] = '90c17ba1ddfc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create User table.'''
  op.create_table(
    'user',
    Column('id', Text, nullable=True),
    Column('username', Text, nullable=False),
    Column('hashed_password', Text, nullable=False),
    Column('is_superuser', Boolean, nullable=False, server_default=false()),
    Column('is_active', Boolean, nullable=False, server_default=true()),
    Column('image', Text, nullable=True),
    Column('role_id', Uuid, nullable=False),
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
    PrimaryKeyConstraint('id', name='pk_user'),
    UniqueConstraint('username', name='uq_user_username'),
    ForeignKeyConstraint(
      ['id'], ['person.person.dni'], name='fk_user_id_person', onupdate='CASCADE'
    ),
    ForeignKeyConstraint(['role_id'], ['user.role.id'], name='fk_user_role_id_role'),
    schema='user',
  )


def downgrade() -> None:
  '''Drop User table.'''
  op.drop_constraint('fk_user_role_id_role', 'user', schema='user')
  op.drop_constraint('fk_user_id_person', 'user', schema='user')
  op.drop_constraint('uq_user_username', 'user', schema='user')
  op.drop_constraint('pk_user', 'user', schema='user')
  op.drop_table('user', schema='user')

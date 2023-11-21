'''create user schema.

Revision ID: f250d08aafab
Revises: 2868a987ef68
Create Date: 2023-09-30 06:00:24.931595

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'f250d08aafab'
down_revision: Union[str, None] = '2868a987ef68'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Creates the user schema.'''
  op.execute('CREATE SCHEMA IF NOT EXISTS "user";')  # pylint: disable=E1101


def downgrade() -> None:
  '''Drops the user schema.'''
  op.execute('DROP SCHEMA IF EXISTS "user";')  # pylint: disable=E1101

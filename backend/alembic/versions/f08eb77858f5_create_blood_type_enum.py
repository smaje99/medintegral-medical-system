'''create blood_type enum.

Revision ID: f08eb77858f5
Revises: 6241cec1319b
Create Date: 2024-01-22 18:14:03.394972

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'f08eb77858f5'
down_revision: Union[str, None] = '6241cec1319b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create BloodType enum.'''
  op.execute("CREATE TYPE bloodtype AS ENUM ('A', 'B', 'AB', 'O');")


def downgrade() -> None:
  '''Drop BloodType enum.'''
  op.execute('DROP TYPE bloodtype;')

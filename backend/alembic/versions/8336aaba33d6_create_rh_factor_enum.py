'''create rh factor enum.

Revision ID: 8336aaba33d6
Revises: f08eb77858f5
Create Date: 2024-01-22 18:17:30.082797

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '8336aaba33d6'
down_revision: Union[str, None] = 'f08eb77858f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create RHFactor enum.'''
  op.execute("CREATE TYPE rhfactor AS ENUM ('+', '-');")


def downgrade() -> None:
  '''Drop RHFactor enum.'''
  op.execute('DROP TYPE rhfactor;')

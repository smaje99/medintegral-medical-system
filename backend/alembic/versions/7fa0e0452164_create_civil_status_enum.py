'''create civil status enum.

Revision ID: 7fa0e0452164
Revises: 8336aaba33d6
Create Date: 2024-01-22 18:20:35.622667

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '7fa0e0452164'
down_revision: Union[str, None] = '8336aaba33d6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create CivilStatus enum.'''
  op.execute('''
    CREATE TYPE civilstatus AS ENUM (
      'single',
      'married',
      'divorced',
      'widowed',
      'marital union'
    );
  ''')


def downgrade() -> None:
  '''Drop CivilStatus enum.'''
  op.execute('DROP TYPE civilstatus;')

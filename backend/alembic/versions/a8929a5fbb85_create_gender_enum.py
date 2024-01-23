'''create gender enum.

Revision ID: a8929a5fbb85
Revises: fb8c75290e40
Create Date: 2024-01-22 17:55:06.601926

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'a8929a5fbb85'
down_revision: Union[str, None] = 'fb8c75290e40'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create the Gender enum.'''
  op.execute("CREATE TYPE gender AS ENUM ('male', 'female');")


def downgrade() -> None:
  '''Drop the Gender enum.'''
  op.execute('DROP TYPE gender;')

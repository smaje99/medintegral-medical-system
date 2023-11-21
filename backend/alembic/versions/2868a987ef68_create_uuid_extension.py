'''create uuid extension.

Revision ID: 2868a987ef68
Revises:
Create Date: 2023-09-30 05:16:00.926314

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '2868a987ef68'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Initialize uuid extension.'''
  op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')


def downgrade() -> None:
  '''Drop uuid extension.'''
  op.execute('DROP EXTENSION IF EXISTS "uuid-ossp";')

'''create document type enum.

Revision ID: 6241cec1319b
Revises: a8929a5fbb85
Create Date: 2024-01-22 18:08:22.062907

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '6241cec1319b'
down_revision: Union[str, None] = 'a8929a5fbb85'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create the DocumentType enum.'''
  op.execute("CREATE TYPE documenttype AS ENUM('R.C.', 'T.I.', 'C.C.', 'C.E.');")


def downgrade() -> None:
  '''Drop the DocumentType enum.'''
  op.execute('DROP TYPE documenttype;')

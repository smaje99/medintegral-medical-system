'''create person schema.

Revision ID: fb8c75290e40
Revises: 1b0f0b47b45c
Create Date: 2024-01-22 17:44:40.982937

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'fb8c75290e40'
down_revision: Union[str, None] = '1b0f0b47b45c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    '''Creates the person schema.'''
    op.execute('CREATE SCHEMA IF NOT EXISTS "person";')


def downgrade() -> None:
  '''Drops the person schema.'''
  op.execute('DROP SCHEMA IF EXISTS "person";')

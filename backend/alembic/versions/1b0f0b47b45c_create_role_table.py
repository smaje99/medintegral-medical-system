"""create role table

Revision ID: 1b0f0b47b45c
Revises: f250d08aafab
Create Date: 2023-09-30 15:23:07.584792

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy import Column, String, Text, PrimaryKeyConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = '1b0f0b47b45c'
down_revision: Union[str, None] = 'f250d08aafab'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    '''Create role table

    This migration creates a table named 'role' which contains the following
    columns:
        - id: UUID primary key
        - name: Text unique
        - description: Text
    '''
    op.create_table(
        'role',
        Column(
            'id',
            UUID(as_uuid=True),
            primary_key=True,
            nullable=False,
            server_default=func.uuid_generate_v4(),
        ),
        Column('name', String(25), nullable=False),
        Column('description', Text, nullable=False),
        PrimaryKeyConstraint('id', name='pk_role'),
        schema='user',
    )
    op.create_index(op.f('uq_role_name'), 'role', ['name'], unique=True, schema='user')


def downgrade() -> None:
    op.drop_index(op.f('uq_role_name'), 'role', schema='user')
    op.drop_table('role', schema='user')

'''create trUser_setUsername trigger.

Revision ID: e78e58e3f222
Revises: 607ca9d83aed
Create Date: 2024-01-29 15:37:30.809361

'''
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'e78e58e3f222'
down_revision: Union[str, None] = '607ca9d83aed'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  '''Create trUser_setUsername trigger.'''
  op.execute('CREATE EXTENSION IF NOT EXISTS "unaccent";')

  op.execute(
    '''
    create or replace function "user".fnGenerateUsername(
      in "name" text,
      in surname text
    )
      returns text
      language plpgsql
    as $$
    declare
      new_username text;
      prefix text;
      postfix text;
      "index" integer;
    begin
      select replace(lower(unaccent("name")), ' ', '') into prefix;
      select lower(unaccent(split_part(surname, ' ', 1))) into postfix;

      select 1 into "index";

      while true loop
        select left(prefix, "index") || '.' || postfix into new_username;

        select "index" + 1 into "index";

        if not exists(
          select true
          from "user"."user"
          where username = new_username
        ) then
          return new_username;
        end if;

        if "index" > length(prefix) then
          select 1 into "index";
          select replace(lower(unaccent(surname)), ' ', '') into postfix;
        end if;
      end loop;
    end
    $$;
    '''
  )

  op.execute(
    '''
    create or replace function "user".fnUser_setUsername()
      returns trigger
      language plpgsql
    as $$
    declare
     name_aux text;
     surname_aux text;
    begin
      select "name", surname into name_aux, surname_aux
      from "person"."person"
      where dni = new.id;

      select "user".fnGenerateUsername(name_aux, surname_aux) into new.username;

      return new;
    end
    $$;
  '''
  )

  op.execute(
    '''
      create or replace trigger trUser_setUsername
        before insert
        on "user"."user"
        for each row
        execute procedure "user".fnUser_setUsername();
    '''
  )


def downgrade() -> None:
  '''Drop trUser_setUsername trigger.'''
  op.execute('DROP TRIGGER IF EXISTS trUser_setUsername ON "user"."user";')
  op.execute('DROP FUNCTION IF EXISTS "user".fnUser_setUsername();')
  op.execute('DROP FUNCTION IF EXISTS "user".fnGenerateUsername(text, text);')
  op.execute('DROP EXTENSION IF EXISTS "unaccent";')

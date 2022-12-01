create or replace function "user".fnGenerateUsername(
    in "name" text,
    in surname text
)
    returns text
    language plpgsql
    as
$$
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
            from "user".user
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
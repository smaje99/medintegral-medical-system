create or replace function "user".fnUser_setUsername()
    returns trigger
    language plpgsql
    as
$$
declare
    name_aux text;
    surname_aux text;
begin
    select
        "name", surname into name_aux, surname_aux
    from person.person
    where dni = new.dni;

    select "user".fnGenerateUsername(name_aux, surname_aux) into new.username;

    return new;
end
$$;

create or replace trigger trUser_setUsername
    before insert
    on "user".user
    for each row
    execute procedure "user".fnUser_setUsername();
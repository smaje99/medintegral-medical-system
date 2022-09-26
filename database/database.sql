-- Active: 1658088866111@@127.0.0.1@5432@medintegral_medical_system
create database medintegral_medical_system;

\c medintegral_medical_system

-- configurations
create extension if not exists "uuid-ossp";


-- schemas
create schema if not exists suggestion;


-- tables, constraints, indexes, views, stored procedures and triggers

-- suggestion
create table if not exists suggestion.suggestion (
    id uuid not null default uuid_generate_v4(),
    opinion varchar(500) not null,
    pinned boolean not null default false,
    created_at timestamp not null default now(),

    constraint pk_suggestion primary key (id)
);

create index idx_suggestion on suggestion.suggestion (pinned);

create or replace function suggestion.fnSuggestion_setPinned()
    returns trigger
    language plpgsql
    as
$$
declare
    pinned_count integer;
begin
    if new.pinned then
        select distinct
            count(pinned) into pinned_count
        from
            suggestion.suggestion
        where
            pinned = true
        group by
            pinned;

        if pinned_count >= 3 then
            raise exception 'Hay 3 sugerencias ancladas ya';
        end if;
    end if;

    return new;
end
$$;

create or replace trigger trSuggestion_setPinned
    before insert or update
    on suggestion.suggestion
    for each row
    execute procedure suggestion.fnSuggestion_setPinned();
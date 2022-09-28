-- Active: 1658088866111@@127.0.0.1@5432@medintegral_medical_system
create database medintegral_medical_system;

\c medintegral_medical_system

-- configurations
create extension if not exists "uuid-ossp";


-- schemas
create schema if not exists suggestion;
create schema if not exists person;
create schema if not exists "user";


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

-- person

create type Gender as enum ('male', 'female');
create type DocumentType as enum ('R.C.', 'T.I.', 'C.C.', 'C.E.');
create type BloodType as enum ('A', 'B', 'AB', 'O');
create type RHFactor as enum ('+', '-');
create type CivilStatus as enum ('single', 'married', 'divorced', 'widower', 'union');

create table if not exists person.Person(
    dni integer not null,
    "name" text not null,
    surname text not null,
    "address" text,
    email text not null,
    phone bigint not null,
    gender Gender not null,
    birthdate date not null,
    document_type DocumentType not null,
    blood_type BloodType,
    rh_factor RHFactor,
    ethnicity text,
    occupation text,
    civil_status CivilStatus,
    created_at timestamp not null default now(),

    constraint pk_person primary key (dni),
    constraint chk_phone check(trunc(log(phone)) + 1 = 10)
);
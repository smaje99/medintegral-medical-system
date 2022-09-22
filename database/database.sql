create database medintegral_medical_system;

\c medintegral_medical_system

-- configurations
create extension if not exists "uuid-ossp";


-- schemas
create schema if not exists suggestion;


-- tables, constraints, indexes, views, stored procedures and triggers
create table if not exists suggestion.suggestion (
    id uuid not null default uuid_generate_v4(),
    opinion varchar(500) not null,
    pinned boolean not null default false,
    created_at timestamp not null default now(),

    constraint pk_suggestion primary key (id)
);

create index idx_suggestion on suggestion.suggestion (pinned);
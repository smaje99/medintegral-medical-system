-- Active: 1658088866111@@127.0.0.1@5432@medintegral_medical_system
create database medintegral_medical_system;

\c medintegral_medical_system

-- configurations
create extension if not exists "uuid-ossp";


-- schemas
create schema if not exists suggestion;
create schema if not exists person;
create schema if not exists "user";
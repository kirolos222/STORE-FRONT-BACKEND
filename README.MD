
#  Database setup
PORT NUMBER IS:5432

CREATE USER postgres WITH PASSWORD 'KERO';

CREATE DATABASE postgres;

CREATE DATABASE postgres_test;

GRANT ALL PRIVILEGES ON DATABASE postgres to postgres;

GRANT ALL PRIVILEGES ON DATABASE postgres_test to postgres;

#  .ENV FILE :MUST BE CREATED

ENV=dev

hosts = 127.0.0.1

db = postgres

dbtest=postgres_test

users = postgres

passwords = KERO

BCRYPT_PASSWORD= *****

SALT_ROUNDS= 10

TOKEN_SECRET=*****
#  db setup
run ***db-migrate up***
to install the dev env tables
run ***npm run test*** to install test env tables and test jasmine unit
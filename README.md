# Dockerized-NodeJS-Postgres-Rest-API

Must have .env file within root directory of the project with following variables:
- PG_USER PG_PASSWORD PG_DATABASE PG_PORT PG_HOST NODE_PORT

> Where are
- PG_USER - postgres user
- PG_PASSWORD - user's password
- PG_DATABASE - database name
- PG_PORT - database port
- PG_HOST - database host
- NODE_PORT - port on which Rest API will listen
>  To run using docker compose:
```
docker compose -f docker-compose.yaml up
```
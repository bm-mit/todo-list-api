# [Roadmap.sh](https://roadmap.sh) - Todo List API Backend Project

A **NestJS** solution of [Todo List API](https://roadmap.sh/projects/todo-list-api)

## Setup

### Setup PostgreSQL

```PostgreSQL
--You can change user, password and database name inside main.ts.
CREATE USER "todo-list-api" WITH ENCRYPTED PASSWORD 'password';

CREATE DATABASE "todo-list-api" OWNER "todo-list-api";
```

### Setup project

```bash
# Install dependencies
yarn 

# Run dev server
yarn start:dev

# Run production server
yarn build
yarn start
```

## API Documentation

After running the project, you can access the API documentation at [http://localhost:3000/api](http://localhost:3000/api)

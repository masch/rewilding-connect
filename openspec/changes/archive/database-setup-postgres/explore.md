# Exploration: Database Setup with PostgreSQL & Drizzle

## Objective
Establish the foundation for a persistent PostgreSQL database using `podman-compose` and integrate it with the Hono backend using Drizzle ORM.

## Current State Analysis
- **Runtime**: Bun (already in use).
- **Backend Framework**: Hono (already in use).
- **Database**: None. Current data is likely in-memory or mocked.
- **Infrastructure**: No container orchestration (compose) found.
- **Dependencies**: `drizzle-orm` and `postgres` (driver) are missing.

## Technical Requirements
1. **Containerization**: `podman-compose.yml` defining a PostgreSQL 16 image.
2. **Environment Variables**: `.env` and `.env.example` with `DATABASE_URL`.
3. **ORM Setup**:
   - Install `drizzle-orm` and `postgres`.
   - Install `drizzle-kit` as a dev dependency.
   - Configure `drizzle.config.ts`.
4. **Database Connection**:
   - Create `apps/backend/src/db/index.ts` to initialize the connection using Bun's native postgres driver or `postgres.js`.
5. **Initial Schema**:
   - Define a minimal schema in `apps/backend/src/db/schema/`.
   - Create a `users` table to support the requested "login" functionality.

## Proposed Components
- **`podman-compose.yml`**:
  ```yaml
  services:
    db:
      image: postgres:16-alpine
      environment:
        POSTGRES_USER: impenetrable
        POSTGRES_PASSWORD: password
        POSTGRES_DB: impenetrable_db
      ports:
        - "5432:5432"
      volumes:
        - postgres_data:/var/lib/postgresql/data

  volumes:
    postgres_data:
  ```

- **`apps/backend/src/db/index.ts`**:
  Initializes Drizzle with `postgres.js` for robust connection pooling and Bun compatibility.

- **`apps/backend/src/db/schema/auth.ts`**:
  Initial table for Entrepreneurs/Admins.

## Risks & Considerations
- **Podman vs Docker**: `podman-compose` usually works as a drop-in for `docker-compose.yml`, but we should ensure the user has `podman` installed and configured.
- **Bun Compatibility**: Drizzle works great with Bun. We'll use `postgres.js` as it's the most recommended driver for Drizzle + Bun/Hono.
- **Migration Strategy**: Use `drizzle-kit push` for rapid development and `drizzle-kit generate` for formal migrations once the schema stabilizes.

## Next Step
- **Proposal**: Formalize the plan to install dependencies and create the configuration files.

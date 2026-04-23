# Specification: Database Foundation & Project Schema

## Overview

This specification details the technical requirements for setting up the PostgreSQL database environment and the initial schema for the `Project` entity.

## 1. Infrastructure (Containerization)

The project will use `podman-compose` (or `docker-compose`) to manage the local database.

### 1.1 `podman-compose.yml`

- **Service**: `db`
- **Image**: `postgres:16-alpine`
- **Ports**: `5432:5432`
- **Environment**:
  - `POSTGRES_USER`: `impenetrable`
  - `POSTGRES_PASSWORD`: `password` (default for dev)
  - `POSTGRES_DB`: `impenetrable_db`
- **Volumes**:
  - `postgres_data`: `/var/lib/postgresql/data`

## 2. Backend Dependencies

The following packages must be installed in `apps/backend`:

- `drizzle-orm`: The ORM core.
- `postgres`: The database driver.
- `drizzle-kit`: Dev tool for migrations and schema management.

## 3. Database Connection

- **Provider**: `postgres.js`
- **Initialization**: `apps/backend/src/db/index.ts`
- **Configuration**: `apps/backend/drizzle.config.ts`

## 4. Schema: `projects`

Based on `@repo/shared/src/types/project.ts`.

| Column                    | Type         | Constraints | Default  |
| ------------------------- | ------------ | ----------- | -------- |
| `id`                      | serial       | Primary Key |          |
| `name`                    | varchar(100) | Not Null    |          |
| `default_language`        | varchar(10)  | Not Null    | 'es'     |
| `supported_languages`     | jsonb        | Not Null    | '["es"]' |
| `cascade_timeout_minutes` | integer      | Not Null    | 30       |
| `max_cascade_attempts`    | integer      | Not Null    | 10       |
| `is_active`               | boolean      | Not Null    | true     |
| `created_at`              | timestamp    | Not Null    | `now()`  |
| `updated_at`              | timestamp    | Not Null    | `now()`  |

### 4.1 Indexes

- Primary Key on `id`.
- Index on `name` for faster lookups (optional but recommended).

## 5. API Endpoints

### 5.1 `GET /v1/projects`

- **Description**: Returns a list of all active projects.
- **Authentication**: None (Public).
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "name": "Impenetrable",
      "default_language": "es",
      "supported_languages": ["es", "en"],
      "cascade_timeout_minutes": 30,
      "max_cascade_attempts": 10,
      "is_active": true
    }
  ]
  ```

## 6. Seeding

### 6.1 Data Source

The initial data will be sourced from the existing mock data in `packages/shared/src/mocks/projects.ts` (moved from `apps/mobile`).

### 6.2 Seeding Process

- **Command**: `make seed` (calls `bun run apps/backend/src/db/seed.ts`).
- **Behavior**:
  - Clears existing data in the `projects` table (optional/idempotent).
  - Inserts all projects defined in `MOCK_PROJECTS`.
  - Uses `onConflictDoUpdate` or similar to handle multiple runs.

## 8. Testing

### 8.1 Integration Tests

- **Framework**: `bun:test`.
- **Target**: `GET /v1/projects`.
- **Method**: `app.request()`.
- **Scenarios**:
  - **Empty Database**: Should return an empty array `[]` with status 200.
  - **Seeded Database**: Should return an array of 4 projects matching the `ProjectSchema`.

## 9. Environment Variables

Added to `.env` and `.env.example`:

```env
DATABASE_URL=postgres://impenetrable:password@localhost:5432/impenetrable_db
```

## 10. Acceptance Criteria

1. `podman-compose up -d` successfully starts a Postgres container.
2. `bunx drizzle-kit push` successfully creates the `projects` table in the database.
3. The backend can connect to the database on startup without errors.
4. `GET /v1/projects` returns an empty array `[]` initially.
5. `make seed` populates the database with the 4 initial projects.
6. After seeding, `GET /v1/projects` returns the 4 projects matching the schema.
7. `make test-backend` passes all tests, including the new project integration tests.

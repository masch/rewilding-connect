# Proposal: Database Infrastructure & Drizzle Integration

## Intent
Provision a local PostgreSQL environment using `podman-compose` and integrate Drizzle ORM into the `@repo/backend` to enable persistent storage, starting with the core `Project` entity.

## Scope
- Create `podman-compose.yml` in the project root.
- Install `drizzle-orm`, `postgres` (driver), and `drizzle-kit` in `apps/backend`.
- Create `.env.example` with database connection strings.
- Initialize Drizzle configuration and connection service.
- Define initial `projects` schema based on the existing `@repo/shared` validators.
- Centralize existing project mocks in `@repo/shared` to ensure SSoT for seeding and testing.
- Implement a seed script to populate the database with these mocks.
- Implement `GET /v1/projects` endpoint to list all available projects.
- Add integration tests for the projects endpoint using `bun:test` and `app.request()`.

## Approach
1. **Infrastructure**:
   - Add `podman-compose.yml` with a standard PostgreSQL 16 image.
   - Use a persistent volume `postgres_data`.
2. **Backend Configuration**:
   - Update `apps/backend/package.json` with new dependencies.
   - Add `apps/backend/drizzle.config.ts` for migration management.
   - Implement `apps/backend/src/db/index.ts` using `postgres.js`.
3. **Domain Modeling**:
   - Create `apps/backend/src/db/schema/index.ts` to export all tables.
   - Implement `apps/backend/src/db/schema/projects.ts` with `projects` table:
     - `id` (serial, primary key)
     - `name` (varchar, required)
     - `default_language` (varchar, default 'es')
     - `supported_languages` (jsonb/text array)
     - `cascade_timeout_minutes` (integer, default 30)
     - `max_cascade_attempts` (integer, default 10)
     - `is_active` (boolean, default true)
     - `created_at`, `updated_at`
4. **Data Management**:
   - Move `apps/mobile/src/mocks/projects.data.ts` to `packages/shared/src/mocks/projects.ts`.
   - Implement `apps/backend/src/db/seed.ts` to populate the `projects` table.
   - Update `Makefile` to ensure `make seed` works as expected.
5. **API Integration**:
   - Create `apps/backend/src/routes/projects.ts`.
   - Implement `GET /` to fetch projects from the database using Drizzle.
6. **Testing**:
   - Create `apps/backend/src/routes/projects.test.ts`.
   - Implement integration tests to verify `GET /v1/projects` returns the seeded projects.
   - Ensure the database connection is handled correctly in the test environment.
7. **Validation**:
   - Ensure `make backend` still works.
   - Verify connection to the containerized DB.
   - Test `GET /v1/projects` returns expected data (after manual insert or seed).

## Impact
- **Backend**: Adds database dependency.
- **Developer Workflow**: Requires `podman` or `docker` running locally.
- **DevOps**: New `podman-compose` workflow.

## Risk Mitigation
- Use standard `postgres:16-alpine` to keep the image size small.
- Use `postgres.js` for best-in-class performance with Bun.
- Abstract the DB connection to allow easy mocking in tests.

# Design: Database Infrastructure & Projects API

## 1. File Structure

### 1.1 Shared Mocks
- `packages/shared/src/mocks/projects.ts`: Centralized source of truth for project data.

### 1.2 Backend Database Layer
- `apps/backend/src/db/index.ts`: Drizzle client initialization using `postgres`.
- `apps/backend/src/db/schema/`:
  - `projects.ts`: Table definition.
  - `index.ts`: Centralized schema export.
- `apps/backend/src/db/seed.ts`: Script to populate data.
- `apps/backend/drizzle.config.ts`: Configuration for Drizzle Kit.

### 1.3 Backend API Layer
- `apps/backend/src/routes/projects.ts`: Hono router for project-related endpoints.
- `apps/backend/src/routes/projects.test.ts`: Integration tests.

## 2. Technical Implementation Details

### 2.1 Database Schema (`projects.ts`)
```typescript
import { pgTable, serial, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  defaultLanguage: varchar("default_language", { length: 10 }).notNull().default("es"),
  supportedLanguages: jsonb("supported_languages").$type<string[]>().notNull().default(["es"]),
  cascadeTimeoutMinutes: integer("cascade_timeout_minutes").notNull().default(30),
  maxCascadeAttempts: integer("max_cascade_attempts").notNull().default(10),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### 2.2 Seeding Strategy
The `seed.ts` script will:
1. Initialize the DB connection.
2. Iterate over `MOCK_PROJECTS` from `@repo/shared`.
3. Use `onConflictDoUpdate` (upsert) targeting the `id` column to ensure idempotency.
4. Close the connection.

### 2.3 API Implementation
- Register `projectsRouter` in `apps/backend/src/app.ts` under `/v1/projects`.
- The router will perform a simple `db.select().from(projects).orderBy(projects.id)`.

## 3. Tooling & Workflow (Makefile)
We will add the following targets to the root `Makefile` to enforce the "Make-First" policy:

- `db-up`: `podman-compose up -d`
- `db-down`: `podman-compose down`
- `db-push`: `cd apps/backend && bunx drizzle-kit push`
- `seed`: `cd apps/backend && bun run src/db/seed.ts` (Update existing target)

### 3.1 Development Workflow
1. `make db-up`
2. `make db-push`
3. `make seed`
4. `make dev`

## 4. Testing Approach
- The integration test will start by ensuring the table is clean or contains the expected seeded data.
- Since we are using a local Postgres container, we'll use the same connection string for now, but we'll ensure tests are isolated by checking the state before assertions.

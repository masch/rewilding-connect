# Tasks: Database Infrastructure & Projects API

## Phase 1: Infrastructure & Configuration

- [x] Create `podman-compose.yml` in the project root. <!-- id: 0 -->
- [x] Create `.env.example` with `DATABASE_URL`. <!-- id: 1 -->
- [x] Create `.env` from `.env.example`. <!-- id: 2 -->
- [x] Add `db-up`, `db-down`, `db-push` targets to root `Makefile`. <!-- id: 3 -->
- [x] Update `seed` target in root `Makefile`. <!-- id: 4 -->

## Phase 2: Dependencies & Boilerplate

- [x] Install `drizzle-orm` and `postgres` in `apps/backend`. <!-- id: 5 -->
- [x] Install `drizzle-kit` as dev dependency in `apps/backend`. <!-- id: 6 -->
- [x] Create `apps/backend/drizzle.config.ts`. <!-- id: 7 -->
- [x] Implement database client in `apps/backend/src/db/index.ts`. <!-- id: 8 -->

## Phase 3: Domain & Data

- [x] Centralize project mocks: Move `apps/mobile/src/mocks/projects.data.ts` to `packages/shared/src/mocks/projects.ts`. <!-- id: 9 -->
- [x] Create `apps/backend/src/db/schema/projects.ts`. <!-- id: 10 -->
- [x] Create `apps/backend/src/db/schema/index.ts`. <!-- id: 11 -->
- [x] Implement `apps/backend/src/db/seed.ts`. <!-- id: 12 -->

## Phase 4: API & Integration

- [x] Create `apps/backend/src/routes/projects.ts` with `GET /` endpoint. <!-- id: 13 -->
- [x] Register `projectsRouter` in `apps/backend/src/app.ts`. <!-- id: 14 -->
- [x] Create integration test `apps/backend/src/routes/projects.test.ts`. <!-- id: 15 -->

## Phase 5: Verification

- [x] Run `make db-up` and verify container. <!-- id: 16 -->
- [x] Run `make db-push` and verify schema. <!-- id: 17 -->
- [x] Run `make seed` and verify data. <!-- id: 18 -->
- [x] Run `make test-backend` and verify all green. <!-- id: 19 -->

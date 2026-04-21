# Tasks: Entity Attribute Renaming (zzz_ prefix)

## Phase 1: Specification (DER)

- [x] 1.1 Rename all attributes in the Mermaid `erDiagram` in `openspec/specs/01-master-system.md` to include `zzz_` prefix.
- [x] 1.2 Update all foreign key references in the DER (e.g., `zzz_project_id FK`).

## Phase 2: Shared Domain Types

- [x] 2.1 Rename all properties in Zod schemas in `packages/shared/src/types/*.ts` to include `zzz_` prefix.
- [x] 2.2 Rename all properties in TypeScript interfaces in `packages/shared/src/types/*.ts` to include `zzz_` prefix.
- [x] 2.3 Update nested schema references and `z.lazy` calls to match new prefixed names.

## Phase 3: Backend Database Schema

- [x] 3.1 Rename all columns in the `projects` table definition in `apps/backend/src/db/schema/projects.ts` to include `zzz_` prefix.
- [x] 3.2 Update inferred types (`ProjectSelect`, `ProjectInsert`) in the same file.

## Phase 4: Mobile Mock Data

- [x] 4.1 Rename all keys in mock data objects in `apps/mobile/src/mocks/catalog.ts` to include `zzz_` prefix.
- [x] 4.2 Rename all keys in mock data objects in `apps/mobile/src/mocks/orders.data.ts` to include `zzz_` prefix.
- [x] 4.3 Rename all keys in mock data objects in `apps/mobile/src/mocks/users.data.ts` to include `zzz_` prefix.
- [x] 4.4 Rename all keys in mock data objects in `apps/mobile/src/mocks/ventures.data.ts` to include `zzz_` prefix.

## Phase 5: Verification

- [x] 5.1 Run `make typecheck` (or equivalent) to verify that the app now requires the new prefixed attributes.
- [x] 5.2 Manually verify that the DER in `01-master-system.md` renders correctly with the new names.

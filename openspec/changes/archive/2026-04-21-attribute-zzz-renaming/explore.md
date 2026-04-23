## Exploration: Entity Attribute Renaming (zzz\_ prefix)

### Current State

The project is in an early stage where entities are defined in three main places:

1.  **Spec (DER)**: `openspec/specs/01-master-system.md` contains a Mermaid `erDiagram` with all planned entities.
2.  **Shared Types**: `packages/shared/src/types/` contains Zod schemas (`OrderDbSchema`, `UserSchema`, etc.) that define the structure of objects used by both backend and mobile.
3.  **Backend Schema**: `apps/backend/src/db/schema/projects.ts` contains the only implemented Drizzle table (`projects`).
4.  **Mocks**: `apps/mobile/src/mocks/` contains hardcoded data for testing the UI without a full backend.

Currently, attributes have standard names (`id`, `name`, `email`, etc.). The user wants to prefix everything with `zzz_` to force a manual review of which fields are actually necessary and used.

### Affected Areas

- `openspec/specs/01-master-system.md` — The Mermaid DER (lines 1929-2100+).
- `packages/shared/src/types/*.ts` — All Zod schemas (`z.object`) and TypeScript interfaces.
- `apps/backend/src/db/schema/projects.ts` — Drizzle table definition.
- `apps/mobile/src/mocks/*.ts` — All mock data objects.

### Approaches

1. **Full Prefixing (Recursive/Global)**
   - **Description**: Rename _every_ property in entities to `zzz_<original_name>`. This includes Primary Keys, Foreign Keys, and metadata fields.
   - **Pros**: Zero ambiguity. Everything is marked as "to be validated".
   - **Cons**: Completely breaks application logic, database relations, and API contracts.
   - **Effort**: High (due to the number of files and cross-references).

2. **Selective Prefixing (Business Logic Only)**
   - **Description**: Rename only business-specific fields (e.g., `name`, `description`) but keep infrastructure fields (`id`, `created_at`, `project_id`) intact.
   - **Pros**: Less breakage; relational integrity might survive partially.
   - **Cons**: Doesn't fully meet the user's "Scream Refactor" goal of identifying _every_ used attribute.
   - **Effort**: Medium.

### Recommendation

Proceed with **Approach 1 (Full Prefixing)** as explicitly requested. The user's goal is a "destructive" refactor to audit the data model.

### Risks

- **Relational Integrity**: Renaming `id` to `zzz_id` and `project_id` to `zzz_project_id` means every relation definition in Drizzle and Zod (like `z.lazy`) must be updated simultaneously.
- **Mock Data**: Mocks will fail to typecheck immediately.
- **Build Failures**: The project will not compile until at least some fields are "un-zzz'd".
- **Regex Edge Cases**: Global search/replace might hit strings or comments that shouldn't be changed.

### Ready for Proposal

Yes. The scope is well-defined. I will now create the proposal to outline the implementation batches.

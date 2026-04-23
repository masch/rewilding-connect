# Proposal: Entity Attribute Renaming (zzz\_ prefix)

## Intent

Mark all existing entity attributes as "unvalidated" by prefixing them with `zzz_`. This forces a manual audit in subsequent SDDs to determine which attributes are truly necessary and used in the real system implementation.

## Scope

### In Scope

- Prefix all attributes in the Mermaid DER within `openspec/specs/01-master-system.md`.
- Prefix all properties in Zod schemas and TypeScript interfaces in `packages/shared/src/types/`.
- Prefix all database columns in Drizzle schemas in `apps/backend/src/db/schema/`.
- Prefix all keys in mock data objects in `apps/mobile/src/mocks/`.

### Out of Scope

- Actually validating the fields (this is for future SDDs).
- Renaming file names.
- Renaming variables in application code (outside of mocks and type definitions).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `01-master-system`: Updated the core data structure definition to reflect the `zzz_` prefix naming convention for all entity attributes.

## Approach

Use a multi-batch regex-based renaming strategy:

1. **Batch 1 (Spec)**: Update the Mermaid `erDiagram` in `01-master-system.md`.
2. **Batch 2 (Shared Types)**: Update Zod schemas and TypeScript interfaces in `packages/shared/src/types/`.
3. **Batch 3 (Backend Schema)**: Update Drizzle table definitions in `apps/backend/src/db/schema/`.
4. **Batch 4 (Mocks)**: Update mock data objects in `apps/mobile/src/mocks/`.

## Affected Areas

| Area                                     | Impact   | Description                     |
| ---------------------------------------- | -------- | ------------------------------- |
| `openspec/specs/01-master-system.md`     | Modified | Mermaid DER attributes renaming |
| `packages/shared/src/types/*.ts`         | Modified | Zod schemas and TS interfaces   |
| `apps/backend/src/db/schema/projects.ts` | Modified | Drizzle table columns           |
| `apps/mobile/src/mocks/*.ts`             | Modified | Mock data objects               |

## Risks

| Risk                          | Likelihood | Mitigation                                               |
| ----------------------------- | ---------- | -------------------------------------------------------- |
| Relational Integrity Breakage | High       | Update foreign key references in sync with primary keys. |
| Build Failures                | High       | This is expected; the user will fix one by one later.    |
| Regex False Positives         | Medium     | Scoped find/replace and manual review of chunks.         |

## Rollback Plan

Revert the changes using `git checkout .` or `git revert`.

## Dependencies

- None.

## Success Criteria

- [ ] All attributes in the DER have the `zzz_` prefix.
- [ ] All Zod schemas in `packages/shared` have `zzz_` prefixed properties.
- [ ] Drizzle schema `projects` has `zzz_` prefixed columns.
- [ ] Mock data in `apps/mobile` matches the new prefixed structure.

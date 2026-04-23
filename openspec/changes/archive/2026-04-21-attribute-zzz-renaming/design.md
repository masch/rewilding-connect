# Design: Entity Attribute Renaming (zzz\_ prefix)

## Technical Approach

The implementation will follow a "destructive refactor" pattern using global regex replacements to prefix all entity attributes with `zzz_`. This will target four distinct areas: the system specification (DER), the shared domain types (Zod/TS), the backend database schema (Drizzle), and the mobile mock data.

## Architecture Decisions

### Decision: Prefix all attributes including Primary and Foreign Keys

**Choice**: Rename even structural fields like `id`, `created_at`, and `project_id`.
**Alternatives considered**: Only prefixing "business" fields like `name` or `description`.
**Rationale**: The user specifically requested `id` -> `zzz_id`. This ensures that _every_ reference to a field must be manually reviewed and corrected in future SDDs, providing a 100% audit coverage.

### Decision: Manual Regex Application per File Type

**Choice**: Use different regex patterns for Mermaid (markdown), Zod (TS), and Drizzle (TS).
**Alternatives considered**: One global regex for all files.
**Rationale**: A single global regex is too risky and could damage non-entity code. Scoped regexes (e.g., targeting `z.object` blocks or `erDiagram` lines) provide better control.

## Data Flow

No changes to data flow logic, as this is a structural renaming task. However, the "contract" between services (Backend <-> Mobile) will be broken until both are updated to use the `zzz_` prefix.

## File Changes

| File                                     | Action | Description                            |
| ---------------------------------------- | ------ | -------------------------------------- |
| `openspec/specs/01-master-system.md`     | Modify | Update Mermaid `erDiagram` attributes. |
| `packages/shared/src/types/*.ts`         | Modify | Update Zod schemas and TS interfaces.  |
| `apps/backend/src/db/schema/projects.ts` | Modify | Update Drizzle table columns.          |
| `apps/mobile/src/mocks/*.ts`             | Modify | Update mock data objects.              |

## Interfaces / Contracts

All Zod schemas in `@repo/shared` will be updated. Example change:

```typescript
// Before
export const OrderDbSchema = z.object({
  id: z.number(),
  reservation_id: z.number(),
});

// After
export const OrderDbSchema = z.object({
  zzz_id: z.number(),
  zzz_reservation_id: z.number(),
});
```

## Testing Strategy

| Layer  | What to Test   | Approach                                                                                            |
| ------ | -------------- | --------------------------------------------------------------------------------------------------- |
| Static | Type Safety    | Run `make typecheck` to confirm total breakage and identify all locations requiring the new prefix. |
| Schema | Zod Validation | Ensure Zod schemas correctly parse objects with `zzz_` prefixed keys.                               |

## Migration / Rollout

This is a developer-only refactor for auditing. No production migration is required at this stage as the system is in early development.

## Open Questions

- None. The user was very explicit about the "destructive" nature of this request.

# Exploration: Finalize zzz\_ Prefix Migration (UI & Tests)

The system has been refactored at the schema and domain level with a `zzz_` prefix for all entity attributes. This exploration identifies the remaining work to align the UI (Mobile), Services, Hooks, and Tests with these new names to restore system functionality.

## Breaking Points Identified

### 1. Mobile UI Components

Most components access entity properties directly via `.property`.

- `ProjectCard.tsx`: Uses `project.id`, `project.name`, `project.is_active`.
- `ReservationCard.tsx`: Uses `reservation.id`, `reservation.status`, `reservation.service_date`.
- `ServiceCard.tsx`: Uses `item.name`, `item.price`, `item.image_url`.

### 2. Services & Hooks

Business logic and selectors are broken.

- `auth.service.ts`: Accesses `user.id`, `user.alias`, etc.
- `useProjectSelectors.ts`: Accesses `projects` list and individual properties.
- `order.service.ts`: Complex mapping of order items and status.

### 3. Shared Mocks (packages/shared)

Wait, did I miss `packages/shared/src/mocks`?
I'll check.

### 4. Tests

All tests in `apps/mobile/src/__tests__` and `packages/shared/src/types/__tests__` expect the old names.

- Zod `parse()` calls fail.
- Snapshots/Expectations fail.

## Proposed Strategy: "The Great Realignment"

We will use targeted regex scripts to rename property accessors.
**Pattern**: `(user|project|order|reservation|item|venture|member|session|device|category)\.(\w+)`
**Replacement**: `$1.zzz_$2`

**Risk**: We must avoid renaming properties of standard objects (like `Array.length`, `Date.getTime`, `Object.keys`) or UI framework objects (`navigation.navigate`).

### Batch Execution Plan

1. **Batch 1**: Services & Hooks (Logical foundation).
2. **Batch 2**: UI Components (Visual alignment).
3. **Batch 3**: Shared Mocks & Tests (Validation alignment).
4. **Batch 4**: Verification via `make typecheck`.

## Dependencies

- This change depends on `attribute-zzz-renaming` (already completed and archived).

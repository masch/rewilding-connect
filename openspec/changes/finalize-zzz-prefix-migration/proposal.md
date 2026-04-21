# Proposal: Finalize zzz_ Prefix Migration

## Intent
Restore full system functionality (Build & Tests) by aligning all property accessors and mock data with the new `zzz_` attribute naming convention.

## Scope
- `apps/mobile/src`: All components, hooks, services, and tests.
- `apps/backend/src`: All controllers, services, and tests.
- `packages/shared/src/mocks`: All mock data files.
- `packages/shared/src/types/__tests__`: All unit tests.

## Approach
1. **Automated Replacement**: Use a Node.js script to perform context-aware renaming of property accessors (`obj.prop` -> `obj.zzz_prop`) for a whitelist of entities.
2. **Manual Cleanup**: Address complex cases like object destructuring (`const { id } = user`) which are harder to regex reliably without false positives.
3. **Mock Sync**: Prefix keys in remaining mock files (shared).
4. **Test Re-alignment**: Update test expectations and mock objects within test files.

## Success Criteria
- `make typecheck` returns **SUCCESS**.
- `bun test` returns **SUCCESS** across all packages.
- Mobile UI renders correctly with data from mocks.

## Risks
- **False Positives**: Accidentally prefixing non-entity properties. (Mitigation: Use entity whitelist in regex).
- **Destructuring**: Destructured variables will break and need manual fix. (Mitigation: Search for `{ id, name }` patterns).

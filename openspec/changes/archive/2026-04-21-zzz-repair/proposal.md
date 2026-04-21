# Proposal: zzz_ prefixing repair

## Intent
Repair the codebase after the aggressive `zzz_` prefix migration which introduced pervasive syntax and type errors. The goal is to restore functional parity, fix broken property accessors, and ensure 100% type-safety.

## Scope
### In Scope
- Repair broken property accessors in UI components (ReservationModal, ReservationCard, booking.tsx).
- Fix corrupted variable naming and shadowing in stores (auth, cart) and services (catalog, auth).
- Correct i18n keys incorrectly prefixed with `zzz_`.
- Restore backend seed and project routes functionality.
- Achieve 0 errors in `make typecheck`.

### Out of Scope
- Reverting the `zzz_` prefix itself (that's for future audit SDDs).
- Implementing new features.

## Capabilities
### New Capabilities
- None

### Modified Capabilities
- 01-master-system: The system now enforces `zzz_` prefixed attributes for internal models but maintains existing functional requirements.

## Approach
Manual systematic audit of typecheck failures. Repairing each failing file by correcting property access (`item.catalog_item` -> `item.zzz_catalog_item`) and variable shadowing (`mockSetCurrentUser(zzz_user)` -> `user`).

## Affected Areas
| Area | Impact | Description |
|------|--------|-------------|
| `apps/mobile/src/app/` | Modified | Repair UI screens and logic |
| `apps/mobile/src/components/` | Modified | Repair UI components |
| `apps/mobile/src/stores/` | Modified | Repair state management |
| `apps/mobile/src/services/` | Modified | Repair mock and API services |
| `apps/backend/src/` | Modified | Repair backend routes and seeding |

## Risks
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missing a property rename | Med | Run `make typecheck` iteratively |
| Breaking UI logic with incorrect names | Low | Manual verification of key flows |

## Rollback Plan
Git revert the entire repair session.

## Success Criteria
- [x] 0 errors in `make typecheck` (all projects).
- [x] Core auth store tests pass.
- [x] Reservation and catalog flows functional in mock mode.

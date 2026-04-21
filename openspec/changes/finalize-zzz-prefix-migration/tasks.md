# Task Checklist: Finalize zzz_ Prefix Migration

## Phase 1: Logic Layer (Services & Hooks)
- [ ] 1.1 Update `apps/mobile/src/services/*.ts` to use `zzz_` prefixed attributes.
- [ ] 1.2 Update `apps/mobile/src/hooks/*.ts` to use `zzz_` prefixed attributes.
- [ ] 1.3 Fix `apps/mobile/src/stores/*.ts` (Zustand stores).

## Phase 2: UI Layer (Components)
- [ ] 2.1 Update `apps/mobile/src/components/**/*.tsx` to use `zzz_` prefixed attributes.
- [ ] 2.2 Update `apps/mobile/src/app/**/*.tsx` (Screen components).

## Phase 3: Mocks & Tests
- [ ] 3.1 Update shared mocks in `packages/shared/src/mocks/projects.ts`.
- [ ] 3.2 Update shared tests in `packages/shared/src/types/__tests__/*.ts`.
- [ ] 3.3 Update mobile tests in `apps/mobile/src/**/__tests__/*.ts`.

## Phase 4: Backend Alignment
- [ ] 4.1 Update `apps/backend/src/services/*.ts` to use `zzz_` prefixed attributes.
- [ ] 4.2 Update `apps/backend/src/routes/*.ts` to use `zzz_` prefixed attributes.

## Phase 5: Verification
- [ ] 5.1 Run `make typecheck` and fix remaining errors.
- [ ] 5.2 Run `bun test` and ensure all tests are green.

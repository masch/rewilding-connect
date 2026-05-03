# Tasks: Backend Auto-Deploy

## Phase 1: Configuration

- [x] **1.1 Wrangler Env**: Update `apps/backend/wrangler.toml` to include `[env.development]`.
  - Ensure `ENVIRONMENT = "development"` is set in `[env.development.vars]`.

## Phase 2: GitHub Actions

- [x] **2.1 Workflow File**: Create `.github/workflows/deploy-backend.yml`.
  - Implement path filtering (`apps/backend/**`, `packages/shared/**`).
  - Implement branch logic (main -> production).
  - Implement manual trigger with environment selection.
  - Implement concurrency grouping.

## Phase 3: Documentation

- [x] **3.1 Deployment Doc**: Update `docs/BACKEND_DEPLOYMENT.md`.
  - Add "Multi-Environment Support" section.
  - Add "Database Migrations (Production/Dev)" section with manual steps.

## Phase 4: Verification

- [x] **4.1 YAML Lint**: Ensure the new workflow is valid.
- [x] **4.2 Manual Test (Instruction)**: Inform the user to set up GitHub Secrets and Environments.

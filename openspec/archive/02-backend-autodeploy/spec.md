# Spec: Backend Auto-Deploy to Cloudflare Workers

## Context

The project uses a Hono backend deployed as a Cloudflare Worker and a Neon PostgreSQL database. Currently, CI runs tests but deployment is manual. We want to automate the deployment to ensure production always reflects the latest validated code in the `main` branch.

## Requirements

1.  **Automated Deployment**: Every push to `main` that affects the backend or shared package must trigger a deployment to Cloudflare Workers.
2.  **Manual Trigger**: Ability to trigger the deployment manually via GitHub Actions UI.
3.  **Concurrency Control**: Prevent multiple simultaneous deployments to avoid race conditions or inconsistent states.
4.  **No Auto-Migrations**: Database migrations will remain a manual process for safety.
5.  **Documentation**: Update deployment documentation to include instructions for manual migrations.

## Scenarios

### Scenario 1: Automatic Deployment on Backend Change

**Given** a developer pushes a change to `apps/backend/src/index.ts` to the `main` branch
**When** the CI workflow (tests, lint) passes
**Then** the `Deploy Backend` workflow should start automatically
**And** it should use `make backend-deploy` to update the Cloudflare Worker.

### Scenario 2: Automatic Deployment on Shared Package Change

**Given** a developer pushes a change to `packages/shared/src/domain.ts` to the `main` branch
**When** the CI workflow passes
**Then** the `Deploy Backend` workflow should start automatically.

### Scenario 3: No Deployment on Mobile Change

**Given** a developer pushes a change to `apps/mobile/src/App.tsx`
**Then** the `Deploy Backend` workflow should **NOT** be triggered.

### Scenario 4: Manual Deployment

**Given** a maintainer wants to force a deployment from the GitHub Actions tab
**When** they select "Run workflow" on `Deploy Backend`
**Then** the backend should be deployed to production regardless of recent file changes.

## Acceptance Criteria

- [ ] New workflow file `.github/workflows/deploy-backend.yml` exists.
- [ ] Workflow correctly filters paths to `apps/backend/**` and `packages/shared/**`.
- [ ] Workflow requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.
- [ ] Documentation in `docs/BACKEND_DEPLOYMENT.md` is updated with manual migration steps.

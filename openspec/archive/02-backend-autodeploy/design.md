# Design: Backend Auto-Deploy to Cloudflare Workers

## Infrastructure Overview

- **Platform**: GitHub Actions.
- **Provider**: Cloudflare Workers.
- **Tooling**: Bun, Wrangler, Make.
- **Environments**: `development` and `production`.

## Multi-Environment Strategy

### 1. Wrangler Configuration (`wrangler.toml`)

The configuration will be split into a top-level default (production) and a specific environment for development.

```toml
# Production (Default)
name = "impenetrable-backend"
[vars]
ENVIRONMENT = "production"

# Development
[env.development]
name = "impenetrable-backend-dev"
[env.development.vars]
ENVIRONMENT = "development"
```

### 2. Workflow Structure: `.github/workflows/deploy-backend.yml`

#### Triggers

- **Push to `main`**: Deploys to `production`.
- **Push to `develop`** (or manual): Deploys to `development`.
- **Manual Trigger**: Allows selecting the target environment.

#### Concurrency

```yaml
concurrency:
  group: deploy-backend-${{ github.ref }}-${{ inputs.environment || 'auto' }}
  cancel-in-progress: true
```

#### Job: `deploy`

- **Runner**: `ubuntu-latest`.
- **Environment**: Determined by branch or input.
- **Steps**:
  1. **Checkout**: `actions/checkout@v6`.
  2. **Setup Bun**: `oven-sh/setup-bun@v2` with `cache: true`.
  3. **Install Dependencies**: `make setup`.
  4. **Deploy**:
     - For production: `make backend-deploy` (default wrangler env).
     - For development: `make backend-deploy-dev`.
     - **Secrets**: Fetched from the corresponding GitHub Environment.

## Documentation Updates: `docs/BACKEND_DEPLOYMENT.md`

### New Section: `Multi-Environment Support`

Explain how to manage secrets and deploys for both `development` and `production`.

### New Section: `Database Migrations (Production/Dev)`

Include steps for running migrations manually for each environment:

1. Ensure `.env.neon` (prod) or `.env.local` (dev) is configured.
2. Run `make db-migrate-neon` (for prod) or standard migrate for dev.

## Security Considerations

- **Secret Masking**: GitHub automatically masks secrets in logs.
- **Environment Protection**: Recommend protecting the `production` environment in GitHub (e.g., required reviewers).

## Verification Plan

1. **Dry Run**: Verify the YAML syntax is valid.
2. **Manual Run**: Trigger the workflow manually to check authentication for both envs.
3. **Automatic Run**: Push changes to `main` and verify production deploy.

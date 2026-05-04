# Backend Deployment: Cloudflare Workers + Neon

This document explains how to configure and deploy the Hono backend for the **Impenetrable Connect** project.

## 🏗️ Architecture Overview

The backend is designed to run in two distinct environments without code changes:

1.  **Development (Local)**: Runs on **Bun** using the `postgres-js` driver to connect to a local PostgreSQL container (via Podman/Docker).
2.  **Production (Cloud)**: Runs on **Cloudflare Workers** using the `@neondatabase/serverless` HTTP driver to connect to **Neon PostgreSQL**.

### The Database Factory

We use a factory pattern in `apps/backend/src/db/index.ts` that detects the environment and instantiates the correct driver:

- If the URL contains `neon.tech` → Use HTTP driver (Optimized for Edge).
- Otherwise → Use TCP driver (Standard for Local).

---

## 🔑 Secret Management

Cloudflare Workers do not use `.env` files for production secrets. Instead, they are stored securely in the Cloudflare infrastructure.

### Required Secrets

| Secret Name       | Source                                                             | Description                                                                                                         |
| :---------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `DATABASE_URL`    | [Neon Console](https://neon.tech)                                  | Connection string (pooled or direct). Must include `sslmode=require`.                                               |
| `JWT_SECRET`      | User Defined                                                       | A long, random string (seed) used to sign and verify authentication tokens.                                         |
| `ALLOWED_ORIGINS` | User Defined                                                       | **REQUIRED.** Comma-separated list of allowed domains for CORS (e.g., `https://myapp.com,https://admin.myapp.com`). |
| `GITHUB_TOKEN`    | [GitHub Personal Access Token](https://github.com/settings/tokens) | [Optional] Token with `repo` scope to fetch workflow status for the health check.                                   |
| `GITHUB_REPO`     | User Defined                                                       | The repository path (e.g., `owner/repo`) to monitor in the health check.                                            |
| `HEALTH_TOKEN`    | User Defined                                                       | [Optional] A secret key required to view detailed diagnostics in `/health` via the `X-Health-Key` header.           |

### How to Configure Keys

Use the provided `Makefile` command to set secrets securely for each environment:

```bash
make backend-secret-set
```

1.  Select the environment (`production` or `development`).
2.  Enter the secret name (e.g., `DATABASE_URL`).
3.  Paste the corresponding value for that environment.

**Note**: You must repeat this for every required secret in **both** environments to ensure the workers can function correctly.

---

## 🚀 Deployment Workflow

### 1. Authentication

First-time setup requires logging into Cloudflare:

```bash
make backend-login
```

### 2. Deploying Changes (Manual)

To bundle and upload the backend to the Edge manually from your local machine:

**Production**:

```bash
make backend-deploy
```

**Development**:

```bash
make backend-deploy-dev
```

### 3. Automated Deployment (CI/CD)

The project includes a GitHub Actions workflow that automatically deploys the backend to Cloudflare:

- **Production**: Triggered on push to `main`.
- **Development**: Triggered manually or on other branches (configurable).

**Required GitHub Secrets**:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID.

### 4. Database Migrations

Migrations are **manual** for security reasons. Follow these steps for each environment:

#### Development / Staging

1. Ensure your `.env` or `.env.development` has the correct `DATABASE_URL`.
2. Run:
   ```bash
   make db-migrate
   ```

#### Production (Neon)

1. Ensure your `.env.neon` has the production connection string.
2. Run:
   ```bash
   make db-migrate-neon
   ```

### 5. Monitoring Logs

To see real-time logs from your workers:

```bash
make backend-logs
```

1. Select the environment (`production` or `development`).
2. The command will stream logs from the corresponding Cloudflare Worker.

### 6. Health & Status Checks

You can check the health and build status of each environment using the following commands:

**Check Health**:

- Production: `make backend-health [KEY=...]`
- Development: `make backend-health-dev [KEY=...]`

**Check GitHub Build Status**:

- Production: `make backend-check-runs [REF=main] [KEY=...]`
- Development: `make backend-check-runs-dev [REF=branch] [KEY=...]`

---

## ⚠️ Important Considerations (Gotchas)

### Compatibility Date

In `wrangler.toml`, the `compatibility_date` MUST be set to `2024-09-23` or later. This ensures Cloudflare enables the necessary Node.js polyfills (like `fs`, `path`, `stream`) required by libraries such as `pino`.

### JWT Configuration

Hono's JWT middleware requires an explicit algorithm. We use **`HS256`** for shared-secret authentication. If omitted, the server will return a 500 error.

### Password Hashing

- **Unified Implementation**: Uses **PBKDF2** via the native **Web Crypto API** (`crypto.subtle`).
- **Compatibility**: This ensures the exact same hashing logic and performance profile across Bun (local), Cloudflare Workers (production), and modern browsers.
- **Security**: Uses SHA-256 with 100,000 iterations and a 16-byte random salt, compliant with modern security standards.

### Shared Dependencies

Wrangler (v3+) natively handles the resolution of workspace dependencies like `@repo/shared` during the bundling process. No additional configuration is required as long as the project structure follows standard monorepo patterns.

---

## 🛠️ Troubleshooting & Debugging

### 500 Internal Server Error

If the API returns a 500 error, it is usually due to one of the following:

1.  **Missing Secret**: A required secret (like `DATABASE_URL` or `JWT_SECRET`) is not set in Cloudflare.
2.  **Missing Binding**: The secret is set in Cloudflare but NOT defined in the `Env` interface in `apps/backend/src/app.ts`.
3.  **CORS Security**: `ALLOWED_ORIGINS` is missing in production. Our policy enforces a hard-fail (500) if no origins are defined to prevent accidental insecure deployments.

**To find the root cause, run:**

```bash
make backend-logs
```

### CORS Issues

If a browser blocks your requests:

- Ensure `ALLOWED_ORIGINS` includes the full protocol (e.g., `https://domain.com`).
- Check that there are no trailing slashes in the origin unless explicitly required.

---

## 📡 Health Check

Always verify the deployment status at:
`https://impenetrable-backend.impenetrable-connect.workers.dev/health`

---

## 🌍 Multi-Environment Support

The backend supports multiple environments in Cloudflare Workers using the `--env` flag.

### Environments defined in `wrangler.toml`:

- **Production (Default)**: `impenetrable-backend`
- **Development**: `impenetrable-backend-dev`

To deploy manually to development:

```bash
cd apps/backend && bunx wrangler deploy --env development
```

## 💰 Cost & Limitations (Free Tier)

This project is optimized to run within the free tiers of our cloud providers.

| Provider       | Service    | Free Tier Limits                 | Exceeded Behavior     | Upgrade Path             |
| :------------- | :--------- | :------------------------------- | :-------------------- | :----------------------- |
| **Cloudflare** | Workers    | 100k requests/day, 10ms CPU time | 429 Too Many Requests | **$5/mo** (10M requests) |
| **Neon**       | PostgreSQL | 0.5 GB storage, 100 CU-hours/mo  | Suspension/Throttling | **$19/mo** (Launch Plan) |

**Architect's Note**:

- **Scale-to-Zero**: Both services will "sleep" during inactivity. The first request after a period of silence may experience a 1-2 second delay (cold start).
- **Storage**: Use Cloudflare R2 or S3 for images/videos; do not store large binary blobs in the database to stay within the 0.5 GB limit.

# Technical Design: System Status Dashboard

## Architecture Overview

The Status Dashboard is a client-side feature that aggregates health information from the Backend API and GitHub Actions. It follows the project's service-oriented architecture in the mobile app.

## Data Models

### Shared Interfaces (`packages/shared/src/types/status.ts`)

```typescript
export interface BackendHealth {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  database: {
    status: "ok" | "error";
    latency: string;
  };
}

export interface GitHubRun {
  id: number;
  name: string;
  status: "completed" | "in_progress" | "queued";
  conclusion: "success" | "failure" | "cancelled" | "timed_out" | null;
  html_url: string;
  created_at: string;
  head_commit: {
    message: string;
    id: string;
  };
}

export interface SystemStatusState {
  backend: BackendHealth | null;
  github: GitHubRun[] | null;
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
}
```

## Service Layer (`apps/mobile/src/services/status.service.ts`)

- **`fetchBackendHealth`**: calls `${EXPO_PUBLIC_API_URL}/health`.
- **`fetchGitHubRuns`**: calls `https://api.github.com/repos/masch/impenetrable-connect/actions/runs`.
- **Filtering Logic**: The service will filter the GitHub API response to only include the latest run for "CI" and "Deploy Web" workflows.

## Component Design (`apps/mobile/src/app/status.tsx`)

### Layout Structure

1. **Screen Wrapper**: Uses `src/components/Screen.tsx`.
2. **Glassmorphic Cards**: Custom components using `backdrop-blur-md` and `bg-surface/60`.
3. **Indicators**:
   - `success`: `bg-success` (Green)
   - `warning`: `bg-warning` (Yellow) - used when `database.latency` > 500ms or workflow is `in_progress`.
   - `error`: `bg-error` (Red) - used when status is `error` or conclusion is `failure`.

### State Management

Uses local `useState` and `useEffect` for data fetching on mount. A manual `refresh` function will re-trigger both fetches.

## Implementation Details

### GitHub API URL

`https://api.github.com/repos/masch/impenetrable-connect/actions/runs?per_page=10`

### Backend API URL

`${process.env.EXPO_PUBLIC_API_URL}/health`

## Security Considerations

Since the repository is public, no authentication header is required for GitHub API. The backend `/health` endpoint is already public. No sensitive information (DB strings, env vars) will be exposed.

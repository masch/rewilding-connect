# Specification: System Status Dashboard

## Requirements

- **Visibility**: The page must be accessible without authentication at the `/status` route.
- **Data Source 1 (Backend)**:
  - Target: `${EXPO_PUBLIC_API_URL}/health`
  - Frequency: On component mount and manual refresh.
  - Required Fields: `status`, `database.status`, `database.latency`, `uptime`.
- **Data Source 2 (GitHub)**:
  - Target: `https://api.github.com/repos/masch/impenetrable-connect/actions/runs`
  - Workflow Filter: `CI` (ci.yml) and `Deploy Web` (deploy-web.yml).
  - Required Fields: `name`, `conclusion`, `status`, `head_commit.message`, `created_at`.
- **UI Components**:
  - **Header**: Branded "System Status" title with glassmorphic background.
  - **Service Card**: Displays service name, status indicator (Circle), and specific metrics (e.g., Latency).
  - **Pipeline Card**: Displays workflow name, status indicator, and commit metadata.
  - **Footer**: "Last updated" relative timestamp and a "Refresh" button.

## Scenarios

### Scenario 1: All Systems Operational

- **Given** the Backend `/health` returns `status: "ok"` and `database.status: "ok"`.
- **And** the latest GitHub runs for `CI` and `Deploy Web` have `conclusion: "success"`.
- **When** the user visits `/status`.
- **Then** all indicators MUST be GREEN.
- **And** the summary text "All systems operational" SHOULD be displayed.

### Scenario 2: Backend Degraded (High Latency)

- **Given** the Backend `/health` returns `database.latency` > 500ms.
- **When** the user visits `/status`.
- **Then** the Database indicator MUST be YELLOW.
- **And** the specific latency value MUST be displayed.

### Scenario 3: Partial Outage (Deployment Failure)

- **Given** the latest `Deploy Web` run on GitHub has `conclusion: "failure"`.
- **When** the user visits `/status`.
- **Then** the "Web App Deployment" indicator MUST be RED.
- **And** the latest commit message SHOULD be visible to help identify the faulty version.

### Scenario 4: Backend API Unreachable

- **Given** the fetch to `/health` fails due to a network error or 5xx response.
- **When** the user visits `/status`.
- **Then** the API indicator MUST be RED.
- **And** the message "Service unreachable" SHOULD be displayed in the card details.

### Scenario 5: GitHub API Rate Limited

- **Given** the GitHub API returns a `403` or `429` status code.
- **When** the user visits `/status`.
- **Then** the Pipeline section MUST show a warning "GitHub data unavailable".
- **And** the Backend status cards MUST remain functional and visible.

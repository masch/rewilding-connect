# Tasks: System Status Dashboard

## Phase 1: Foundation

- [ ] Create `packages/shared/src/types/status.ts` with `BackendHealth` and `GitHubRun` interfaces.
- [ ] Export `status.ts` from `packages/shared/src/types/index.ts`.
- [ ] Add `status` translation keys to `apps/mobile/src/i18n/locales/en.json` and `es.json`.
  - Keys: `title`, `services`, `pipelines`, `api`, `database`, `ci`, `deploy`, `operational`, `degraded`, `outage`, `last_updated`, `refresh`.

## Phase 2: Logic Layer

- [ ] Create `apps/mobile/src/services/status.service.ts`.
- [ ] Implement `fetchBackendHealth` using `EXPO_PUBLIC_API_URL`.
- [ ] Implement `fetchGitHubRuns` using GitHub REST API.
- [ ] Implement `getSystemStatus` aggregator function.

## Phase 3: UI Implementation

- [ ] Create `apps/mobile/src/app/status.tsx`.
- [ ] Implement `StatusIndicator` component (Green/Yellow/Red dot).
- [ ] Implement `GlassCard` wrapper component using `backdrop-blur-md`.
- [ ] Assemble the dashboard with "Services" and "Pipelines" sections.
- [ ] Integrate `LoadingView` and error handling.

## Phase 4: Verification & Polish

- [ ] Verify public access to `/status`.
- [ ] Test "Yellow" state by manually mocking high latency in the service.
- [ ] Test "Red" state by mocking a failed GitHub conclusion.
- [ ] Final visual check on Web and Mobile (responsive glassmorphism).

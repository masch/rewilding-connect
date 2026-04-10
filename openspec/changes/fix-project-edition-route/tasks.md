# Tasks: Fix Project Edition Route

## Phase 1: Foundation

- [ ] 1.1 Create `apps/mobile/src/app/admin/project/[id].tsx` directory structure (if needed)

## Phase 2: Core Implementation

- [ ] 2.1 Create dynamic route `apps/mobile/src/app/admin/project/[id].tsx` with:
  - `useLocalSearchParams()` to detect create (id="new") vs edit mode
  - Form for Project fields: name, default_language, supported_languages, cascade_timeout_minutes, max_cascade_attempts, is_active
  - Use `useProjectStore.createProject()` for create mode
  - Use `useProjectStore.selectProject()` + `updateProject()` for edit mode
- [ ] 2.2 Implement mode detection: `id === "new"` = create, otherwise edit
- [ ] 2.3 Add form validation per `PROJECT_CONSTRAINTS` from `@repo/shared`

## Phase 3: Integration

- [ ] 3.1 Verify navigation in `apps/mobile/src/app/admin/project.tsx:89` points to `/admin/project/new`
- [ ] 3.2 Connect ProjectCard onPress to navigate to `/admin/project/{projectId}`

## Phase 4: Verification

- [ ] 4.1 Test: Navigate to `/admin/project/new` shows empty form (create mode)
- [ ] 4.2 Test: Navigate to `/admin/project/1` loads project data (edit mode)
- [ ] 4.3 Test: Save new project redirects back to list
- [ ] 4.4 Test: Update existing project redirects back with updated data

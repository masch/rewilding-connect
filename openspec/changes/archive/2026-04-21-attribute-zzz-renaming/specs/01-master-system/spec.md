# Delta for 01-master-system

## MODIFIED Requirements

### Requirement: Entity Naming Convention (zzz\_ prefix)

All entity attributes across the system SHALL be prefixed with `zzz_` to indicate they are currently unvalidated. This naming convention applies to the Entity Relationship Diagram (ERD), Shared Types, Backend Schemas, and Mock Data.
(Previously: Attributes were named using standard snake_case without prefixes.)

#### Scenario: Renaming attributes in ERD

- GIVEN the existing Mermaid `erDiagram` in Section 5 of the master system spec
- WHEN the attribute renaming refactor is applied
- THEN every attribute in the diagram MUST start with the `zzz_` prefix
- AND foreign key references MUST also use the `zzz_` prefix (e.g., `zzz_project_id FK`)

#### Scenario: Renaming attributes in Shared Types

- GIVEN a Zod schema in `packages/shared/src/types`
- WHEN the attribute renaming refactor is applied
- THEN every property in the schema MUST be renamed to include the `zzz_` prefix
- AND the corresponding TypeScript interfaces MUST match this prefixed structure

#### Scenario: Renaming attributes in Backend Schemas

- GIVEN a Drizzle table definition in `apps/backend/src/db/schema`
- WHEN the attribute renaming refactor is applied
- THEN every column name in the database mapping MUST include the `zzz_` prefix

#### Scenario: Renaming attributes in Mobile Mocks

- GIVEN a mock data object in `apps/mobile/src/mocks`
- WHEN the attribute renaming refactor is applied
- THEN every key in the object MUST include the `zzz_` prefix

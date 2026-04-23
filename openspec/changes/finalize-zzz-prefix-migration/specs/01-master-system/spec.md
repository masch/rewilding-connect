# Delta for 01-master-system: UI & Test Alignment

## MODIFIED Requirements

### Requirement: Codebase Alignment with zzz\_ Prefix

All application code (Frontend and Backend) MUST use the `zzz_` prefix when accessing entity attributes. This ensures consistency with the updated Data Architecture and Domain Types.

#### Scenario: Accessing properties in UI Components

- GIVEN a component receiving an entity (e.g., `Project`)
- WHEN accessing an attribute like `name`
- THEN the code MUST use `project.zzz_name`

#### Scenario: Validating data with Zod

- GIVEN a Zod schema validation
- WHEN passing data to `parse()`
- THEN the input object keys MUST include the `zzz_` prefix

#### Scenario: Unit Testing

- GIVEN a test for a service or component
- WHEN defining mock data or checking expectations
- THEN all attribute keys and accessors MUST use the `zzz_` prefix

# Technical Design: zzz_ Migration Alignment

## Architecture Decisions

### 1. Regex Whitelist Strategy
To avoid corrupting standard JS/TS methods or framework properties, we will only prefix property accessors when they are preceded by a known entity variable name or type.

**Whitelist Variables/Contexts**:
`user`, `project`, `order`, `item`, `reservation`, `venture`, `member`, `session`, `device`, `category`.

### 2. Destructuring Handling
Object destructuring is a major breaking point.
`const { id, name } = project` -> `const { zzz_id: id, zzz_name: name } = project` (keeping local variable names unchanged where possible to minimize cascading changes).

### 3. Service Selectors
Selectors in `apps/mobile/src/hooks` and `apps/mobile/src/services` will be updated to return the prefixed values, but we will maintain the logic that filters or maps them.

## File Mapping

| Layer | Directories | Action |
|-------|-------------|--------|
| Services | `apps/mobile/src/services` | Replace `.prop` with `.zzz_prop` |
| Hooks | `apps/mobile/src/hooks` | Replace `.prop` with `.zzz_prop` |
| Components | `apps/mobile/src/components` | Replace `.prop` with `.zzz_prop` |
| Tests | `**/__tests__/*.ts` | Update mock objects and expectations |
| Shared Mocks | `packages/shared/src/mocks` | Prefix keys in data objects |

## Implementation Patterns

### Property Access
```typescript
// Before
project.name
// After
project.zzz_name
```

### Destructuring
```typescript
// Before
const { id } = project;
// After
const { zzz_id: id } = project;
```

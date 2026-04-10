# Design: Fix Project Edition Route

## Technical Approach

Crear un single dynamic route `admin/project/[id].tsx` que maneje tanto creación como edición de proyectos usando `useLocalSearchParams()`. El archivo determina el modo basándose en el valor del parámetro `id`: `"new"` = modo crear, cualquier otro = modo editar.

## Architecture Decisions

### Decision: Dynamic Route Pattern vs Static Routes

**Choice**: Single dynamic route `admin/project/[id].tsx`
**Alternatives considered**: Two static routes `/admin/project/new` + `/admin/project/edit`
**Rationale**: Un solo archivo maneja ambos casos, reducción de código duplicado, el parámetro `id` ya está disponible desde la navegación existente (`/admin/project/new` en línea 89).

### Decision: Param Recovery Strategy

**Choice**: `useLocalSearchParams()` de expo-router
**Alternatives considered**: `useGlobalSearchParams()`, `useSearchParams()`
**Rationale**: `useLocalSearchParams()` es el patrón recomendado para file-based routes en Expo Router ya que funciona correctamente con la navegación basada en archivos.

### Decision: Form State Management

**Choice**: Usar `useProjectStore` existente + formulario local controlado
**Alternatives considered**: Store único para formulario
**Rationale**: El proyecto ya tiene un store robusto (`useProjectStore`) con `selectProject`, `createProject`, `updateProject`. El formulario solo necesita manejar estado local de inputs para validación antes de llamar al store.

## Data Flow

```
/admin/project/new (click "Agregar Proyecto")
        │
        ▼
admin/project/[id].tsx (id="new")
        │
        ├── useLocalSearchParams() ──► id === "new" → Modo CREAR
        │
        ▼
useProjectStore.createProject(data)
        │
        ▼
router.back()

/admin/project/123 (click editar en ProjectCard)
        │
        ▼
admin/project/[id].tsx (id="123")
        │
        ├── useLocalSearchParams() ──► id !== "new" → Modo EDITAR
        │
        ├── useProjectStore.selectProject(id)
        │
        ▼
useProjectStore.updateProject(id, data)
        │
        ▼
router.back()
```

## File Changes

| File                                         | Action | Description                                 |
| -------------------------------------------- | ------ | ------------------------------------------- |
| `apps/mobile/src/app/admin/project/[id].tsx` | Create | Dynamic route para crear/editar proyectos   |
| `apps/mobile/src/app/admin/project.tsx`      | None   | Verificar navegación ya correcta (línea 89) |

## Interfaces / Contracts

### Params Type

```typescript
interface ProjectRouteParams {
  id: string; // "new" para crear, número como string para editar
}
```

### Form State Interface

```typescript
interface ProjectFormState {
  name: string;
  default_language: Language;
  supported_languages: Language[];
  cascade_timeout_minutes: number;
  max_cascade_attempts: number;
  is_active: boolean;
}
```

### Mode Detection

```typescript
const { id } = useLocalSearchParams<{ id: string }>();
const isCreateMode = id === "new";
const projectId = isCreateMode ? null : parseInt(id, 10);
```

## Testing Strategy

| Layer       | What to Test                     | Approach                                  |
| ----------- | -------------------------------- | ----------------------------------------- |
| Unit        | Mode detection logic             | Verify `id === "new"` returns create mode |
| Unit        | Form validation                  | Test empty name, invalid languages        |
| Integration | Navigate to `/admin/project/new` | Click button, verify route                |
| Integration | Navigate to `/admin/project/1`   | From ProjectCard, verify loads data       |
| E2E         | Full create flow                 | Fill form, save, verify in list           |
| E2E         | Full edit flow                   | Edit existing, verify updates             |

## Migration / Rollout

No migration required — this is a route recovery fix. Existing projects remain unaffected.

## Open Questions

- [ ] Recover ProjectFormScreen logic: Need to reference git history (commit 704dcae or prior) to recover exact form fields and validation.
- [ ] Confirm FormInput/FormSwitch components cover all needed field types (language selector, toggles).
- [ ] Verify `useProjectStore.selectProject()` populates `selectedProject` correctly for edit mode loading.

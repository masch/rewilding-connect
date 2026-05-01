# Proposal: Fix Project Edition Route

## Intent

El usuario no puede acceder a la página de edición de proyectos. Al hacer click en "Agregar Proyecto" desde projects screen, la app intenta navegar a `/admin/project/new` pero esa ruta no existe, resultando en "Unmatched Route".

**Root Cause**: Durante el refactor de tabs (commit a5362d3), el archivo `apps/mobile/src/app/projects/[id].tsx` fue eliminado sin migrar la funcionalidad al nuevo estructura `admin/`. El código de navegación en `admin/project.tsx:89` usa `router.push("/admin/project/new")` pero no existe el file-based route correspondiente.

## Scope

### In Scope

- Crear ruta dinámica `apps/mobile/src/app/admin/project/[id].tsx`
- Restaurar lógica de ProjectFormScreen (crear/editar proyecto)
- Corregir navegación existente en `admin/project.tsx:89`

### Out of Scope

- Diseño UI del formulario (fuera de scope, solo recuperación)
- Nuevas features de edición
- Tests exhaustivos

## Capabilities

> Contract con sdd-spec

### New Capabilities

- None — solo recuperación de funcionalidad existente

### Modified Capabilities

- None — no hay cambios en specs, es fix de routing

## Approach

**Patrón recomendado: Single Dynamic Route**

1. Crear `apps/mobile/src/app/admin/project/[id].tsx` — Expo Router dynamic route
2. Usar `useLocalSearchParams()` para obtener el `id` de la URL
3. Determinar modo: `id === "new"` → modo creación, cualquier otro → modo edición
4. Recuperar la lógica de ProjectFormScreen (la que existía antes del refactor)
5. La navegación en `admin/project.tsx:89` ya apunta a `/admin/project/new` → no requiere cambios

**Tradeoff evaluado**:

- Alternativa A (ruta estática `/admin/project/new`): Funciona pero requiere route adicional para edición
- Alternativa B (dynamic `[id]`): Un solo archivo maneja ambos casos ✓ recomendado

## Affected Areas

| Area                                         | Impact | Description                                    |
| -------------------------------------------- | ------ | ---------------------------------------------- |
| `apps/mobile/src/app/admin/project/[id].tsx` | New    | Dynamic route para crear/editar proyectos      |
| `apps/mobile/src/app/admin/project.tsx:89`   | Verify | Navigation ya es correcta `/admin/project/new` |

## Risks

| Risk                            | Likelihood | Mitigation                                        |
| ------------------------------- | ---------- | ------------------------------------------------- |
| Logica de formulario incompleta | Medium     | Recover del commit previo (704dcae o git history) |
| Params no se parsean            | Low        | Usar useLocalSearchParams() correctamente         |

## Rollback Plan

1. Eliminar archivo `apps/mobile/src/app/admin/project/[id].tsx`
2. Route automáticamente 404 ( esperado)
3. No hay cambios en BD

## Dependencies

- None

## Success Criteria

- [ ] Click en "Agregar Proyecto" navega a formulario de creación
- [ ] URL muestra `/admin/project/new`
- [ ] Formulario permite guardar nuevo proyecto
- [ ] Click en editar proyecto existente navega a `/admin/project/{id}`
- [ ] Formulario carga datos del proyecto para edición

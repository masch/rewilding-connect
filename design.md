# Design System Document: Editorial Earth

## 1. Overview & Creative North Star: "The Tectonic Editorial"

This design system rejects the "app-template" aesthetic in favor of a high-end editorial experience that feels as grounded and enduring as the Chaco landscape. Our Creative North Star is **Tectonic Editorial**: a visual language where content isn't just "placed" on a screen, but carved out of it.

We move beyond the standard mobile grid by using **intentional asymmetry** and **tonal layering**. By utilizing high-contrast typography scales and overlapping surface elements, we create a sense of professional authority and regional soul. The experience must feel premium yet rugged, optimized for low-end mobile devices through smart CSS/system-level styling rather than heavy assets.

---

## 2. Colors & Surface Architecture

The palette is a direct translation of the Chaco region—terracotta clays, deep forest canopies, and sun-drenched ochres.

### The "No-Line" Rule

**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly on a `surface` background. The eye should perceive change through tone, not lines.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:

- **Base Layer:** `surface` (#fcf9f2) - The canvas.
- **Content Sections:** `surface-container-low` (#f6f3ec) - For secondary groupings.
- **Interactive Cards:** `surface-container-highest` (#e5e2db) - To bring critical information to the foreground.

### The Glass & Gradient Rule

To add a "signature" polish, use subtle linear gradients on primary CTAs:

- **Primary Action Gradient:** From `primary` (#2b868c) to `primary-container` (#8c3d2b). This prevents the UI from feeling flat and provides a "lit-from-within" tactile quality.

---

## 3. Typography: The Authoritative Voice

We utilize a pairing of **Manrope** for high-impact editorial moments and **Inter** for utilitarian clarity.

- **Display & Headlines (Manrope):** Used for large-scale storytelling and page titles (e.g., `display-md`). The tighter tracking and bold weights convey the "Impenetrable" strength of the region.
- **Body & Labels (Inter):** Used for all reservation details and instructional text. This ensures maximum legibility on low-end screens where pixel density may be lower.
- **Spanish (Castellano) Optimization:** All typography scales must account for the 15-20% increased character count in Spanish. Avoid fixed-width containers; allow text to wrap gracefully to maintain accessibility.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are forbidden. We achieve hierarchy through **Ambient Depth**.

- **The Layering Principle:** Place a `surface-container-lowest` card (#ffffff) on a `surface-container-low` (#f6f3ec) background. This creates a "soft lift" that is easier on the processor and the eyes than artificial shadows.
- **Ghost Borders (Accessibility Fallback):** If a container lacks enough contrast against a background for low-vision users, use a "Ghost Border": `outline-variant` (#dbc1bb) at **15% opacity**.
- **Glassmorphism:** For floating navigation or urgent overlays, use `surface` at 85% opacity with a `backdrop-blur` of 8px. This anchors the element in the environment rather than making it feel like a disconnected pop-up.

---

## 5. Components: Rugged & Accessible

### Buttons (Acceso Primario)

- **Primary:** Massive touch targets (min-height: `16` / 5.5rem). Use the `primary` color (#2b868c) with `on-primary` (#ffffff) text.
- **Shape:** **Sharp, angular (0)**. Avoid fully rounded pills; keep the geometry "tectonic" and structural.
- **States:** High-contrast focus states using `secondary` (#47664b) to ensure clear navigation for users with motor-control challenges.

### Cards & Lists (Contenedores)

- **Rule:** Forbid divider lines.
- **Structure:** Use vertical white space (Spacing Scale `6` or `8`) to separate list items. Use a subtle background shift to `surface-container-low` for alternating items if necessary.
- **Cards:** Use `surface-container-highest` for reservation cards. Headlines should be `title-lg`, bold, and high-contrast.

### Status Badges (Estados)

- **Buscando (Searching):** `tertiary-container` (#764d00) background with `on-tertiary-fixed` (#291800) text.
- **Confirmado (Confirmed):** `secondary-container` (#c8ecc9) background with `on-secondary-fixed` (#03210c) text.
- **Expirado (Expired):** `error_container` (#ffdad6) background with `on-error-container` (#93000a) text.
- **Styling:** Large, bold labels using `label-md`.

### Input Fields (Campos de Entrada)

- **Styling:** Solid `surface-variant` (#e5e2db) backgrounds. No bottom-line-only inputs.
- **Focus:** A 3px "Ghost Border" of `primary` (#2b868c) to indicate activity.

---

## 6. Do's and Don'ts

### Do

- **DO** use the Spacing Scale religiously. Consistent gaps (e.g., `spacing-4`) create a sense of professional rhythm.
- **DO** prioritize the "Primary Action." In the Chaco heat, users need to find the "Reservar Ahora" button instantly.
- **DO** use earthy, high-contrast combinations like `on-primary-fixed` (#3d0600) on `primary-fixed` (#ffdad2).

### Don't

- **DON'T** use 1px borders. They feel cheap and "default."
- **DON'T** use pure black (#000000). Use `on-surface` (#1c1c18) to keep the "organic" feel of the landscape.
- **DON'T** use small touch targets. Every interactive element must be at least 48x48dp, ideally 64dp+ for this specific user base.
- **DON'T** use standard Material shadows. Rely on tonal shifts between surface-container tokens to define hierarchy.

---

## 7. Spanish Language Considerations

- **Contextual Buttons:** Instead of "OK," use "Entendido" or "Continuar."
- **Genders:** Ensure status badges are gender-neutral or match the noun (e.g., "Reserva Confirmada").
- **Hierarchy:** Use `headline-sm` for section titles like "Tus Reservas" to ensure the cultural tone feels authoritative and trustworthy.

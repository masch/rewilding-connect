# Design Tokens

Implementation of the Editorial Earth design system defined in `design.md`.

## Colors

See `design.md` Section 2 for the creative rationale.

### Surface Colors

| Token                     | Hex     | Usage                     |
| ------------------------- | ------- | ------------------------- |
| surface                   | #fcf9f2 | Base canvas               |
| surface-container-low     | #f6f3ec | Secondary groupings       |
| surface-container-highest | #e5e2db | Interactive cards, inputs |
| surface-container-lowest  | #ffffff | Elevated cards            |

### Primary Colors

| Token             | Hex     | Usage                     |
| ----------------- | ------- | ------------------------- |
| primary           | #2b868c | Primary actions, CTAs     |
| on-primary        | #ffffff | Text on primary           |
| primary-container | #8c3d2b | Gradient target           |
| primary-fixed     | #ffdad2 | High contrast backgrounds |

### Secondary Colors

| Token               | Hex     | Usage                  |
| ------------------- | ------- | ---------------------- |
| secondary           | #47664b | Focus states, accents  |
| secondary-container | #c8ecc9 | Confirmed status badge |

### Tertiary & Status

| Token              | Hex     | Usage                      |
| ------------------ | ------- | -------------------------- |
| tertiary-container | #764d00 | Buscando (Searching) badge |
| on-tertiary-fixed  | #291800 | Badge text                 |
| error-container    | #ffdad6 | Expired status             |
| on-error-container | #93000a | Error text                 |

### Text & Outlines

| Token           | Hex     | Usage                         |
| --------------- | ------- | ----------------------------- |
| on-surface      | #1c1c18 | Primary text (NOT pure black) |
| outline-variant | #dbc1bb | Ghost borders (15% opacity)   |

## Typography

See `design.md` Section 3.

- **Display & Headlines:** Manrope (tight tracking, bold)
- **Body & Labels:** Inter (utilitarian clarity)
- **Spanish optimization:** Allow text wrap, no fixed-width containers

## Spacing Scale

See `design.md` Section 6 - "DO use Spacing Scale"

- Base unit: 4px
- Standard gaps: `spacing-4`, `spacing-6`, `spacing-8`

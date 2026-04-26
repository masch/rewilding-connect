# Tasks: Entrepreneur UX Refinements & Notification Strategy

## Phase 1: Data Model & Backend Fixes

### 1.1 Fix Capacity Logic

- **File**: `apps/backend/src/services/order.service.ts` (or relevant occupation logic)
- **Task**: Change occupation calculation to use `SUM(total_guests)` instead of `SUM(quantity)`.
- **Validation**: Seed a venture with `max_capacity: 10` and create an order for 12 guests. It must skip the venture.

### 1.2 Add Suggested Time Field

- **File**: `apps/backend/src/db/schema/orders.ts` and `@repo/shared`
- **Task**: Add `suggested_time` (varchar) field to Order schema.
- **Task**: Update Order creation validation (Zod) to include optional `suggested_time`.

---

## Phase 2: Mobile UI Refinements

### 2.1 Update Vocabulary (Labels)

- **File**: `apps/mobile/src/i18n/es.json`
- **Task**: Rename `orders.status.cancelled` to "Cancelado" and ensure "Rechazado" is used for entrepreneur declines.

### 2.2 Implement "Solicitudes" Screen

- **File**: `apps/mobile/src/app/entrepreneur/request.tsx`
- **Task**: Replace placeholder with a list of `OFFER_PENDING` orders using `ReservationCard`.
- **Task**: Add polling logic (every 20s) to refresh the list.

### 2.3 Implement Tab Indicators

- **File**: `apps/mobile/src/app/entrepreneur/_layout.tsx`
- **Task**: Add a badge component to the "Solicitudes" tab icon that displays the count of pending offers from the order store.

### 2.4 Update Agenda Stats

- **File**: `apps/mobile/src/stores/agenda.store.ts`
- **Task**: Update `getOccupationStats` to use `order.zzz_reservation?.zzz_guest_count`.

### 2.5 Expand Profile Screen

- **File**: `apps/mobile/src/app/entrepreneur/profile.tsx`
- **Task**: Add "Venture Management" section with Pause/Resume toggles.

---

## Phase 3: Notification Foundation

### 3.1 Expo Push Integration (Scaffolding)

- **Task**: Configure `expo-notifications` handler in `apps/mobile/src/app/_layout.tsx`.
- **Task**: Create a service to register push tokens with the backend on login.

### 3.2 WhatsApp Fallback UI

- **File**: `apps/mobile/src/app/tourist/booking.tsx`
- **Task**: Add "Notify me via WhatsApp" checkbox and phone number input field.

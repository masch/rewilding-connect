# Proposal: Normalize Order-Reservation Relationship

## Intent

Centralize temporal context (service date and time of day) in the `Reservation` entity and remove redundant fields from the `Order` entity.

## Context

Currently, both `Order` and `Reservation` hold `service_date` and `time_of_day`. This redundancy causes synchronization issues, makes it harder to manage the entrepreneur's agenda, and complicates the data model.

## Proposed Changes

1.  **Shared Types**: Update `OrderSchema` and `ReservationSchema` in `@repo/shared` to reflect the new hierarchy.
2.  **Mock Data**: Refactor `orders.data.ts` to use a centralized state and implement proper JOIN logic.
3.  **Services**: Update `catalog.service.ts` and others to interact with the new aggregate structure.
4.  **UI Components**: Refactor `Agenda`, `Orders`, and `Booking` screens to read date/time from the reservation.

## Tradeoffs

- **Pros**: Cleaner data model, single source of truth for time, easier to group orders by session.
- **Cons**: Requires manual hydrating of orders with reservations in the mock system/frontend until the backend does it via SQL JOINs.

import { Order, Reservation } from "@repo/shared";
import { getMockUserId } from "./users";
import { logger } from "../services/logger.service";
import { INITIAL_MOCK_ORDERS, MOCK_RESERVATIONS } from "./orders.data";
import { MOCK_CATALOG_ITEMS } from "./catalog";
import { MOCK_USERS } from "./users.data";
import { MOCK_VENTURES } from "./ventures.data";

/**
 * Mock services for orders
 * Consumes centralized data from orders.data.ts
 */

// Shared in-memory state for orders and reservations
const GLOBAL_ORDERS_KEY = "__IMPENETRABLE_MOCK_ORDERS_STATE__";

// Initialize global orders state if not already present
const ordersStateContainer = globalThis as unknown as {
  [GLOBAL_ORDERS_KEY]: { orders: Order[]; reservations: Reservation[] };
};

if (!ordersStateContainer[GLOBAL_ORDERS_KEY]) {
  ordersStateContainer[GLOBAL_ORDERS_KEY] = {
    orders: [...INITIAL_MOCK_ORDERS],
    reservations: [...MOCK_RESERVATIONS],
  };
}
const ordersState = ordersStateContainer[GLOBAL_ORDERS_KEY];

// Get all reservations (open reservations with no zzz_items yet)
export function getMockReservations(): Reservation[] {
  const userId = getEffectiveUserId();
  return ordersState.reservations.filter((r: Reservation) => r.zzz_user_id === userId);
}

// Fallback for zzz_user ID to ensure visibility in mock mode
const getEffectiveUserId = () => {
  return getMockUserId();
};

/**
 * Get all mock orders in the state (unfiltered)
 */
export function getAllMockOrders(): Order[] {
  return ordersState.orders.map((order) => {
    const zzz_reservation = ordersState.reservations.find(
      (r) => r.zzz_id === order.zzz_reservation_id,
    );
    const enrichedReservation = zzz_reservation
      ? {
          ...zzz_reservation,
          zzz_user: MOCK_USERS.find((u) => u.zzz_id === zzz_reservation.zzz_user_id),
        }
      : undefined;

    const enrichedItems = (order.zzz_items || []).map((item) => ({
      ...item,
      zzz_catalog_item: MOCK_CATALOG_ITEMS[item.zzz_catalog_item_id],
    }));

    const confirmedVenture = order.zzz_confirmed_venture_id
      ? MOCK_VENTURES.find((v) => v.zzz_id === order.zzz_confirmed_venture_id)
      : undefined;

    const currentOfferVenture = order.zzz_current_offer_venture_id
      ? MOCK_VENTURES.find((v) => v.zzz_id === order.zzz_current_offer_venture_id)
      : undefined;

    return {
      ...order,
      zzz_reservation: enrichedReservation,
      zzz_items: enrichedItems,
      zzz_confirmed_venture: confirmedVenture,
      zzz_current_offer_venture: currentOfferVenture,
    };
  });
}

/**
 * Get mock orders for the current zzz_user (filtered)
 */
export function getMockOrders(): Order[] {
  const userId = getEffectiveUserId();

  // Filter orders by checking their zzz_reservation's zzz_user_id
  const orders = ordersState.orders.filter((o: Order) => {
    const zzz_reservation = ordersState.reservations.find((r) => r.zzz_id === o.zzz_reservation_id);
    return zzz_reservation?.zzz_user_id === userId;
  });

  return orders.map((order) => {
    const zzz_reservation = ordersState.reservations.find(
      (r) => r.zzz_id === order.zzz_reservation_id,
    );
    const enrichedReservation = zzz_reservation
      ? {
          ...zzz_reservation,
          zzz_user: MOCK_USERS.find((u) => u.zzz_id === zzz_reservation.zzz_user_id),
        }
      : undefined;

    const enrichedItems = (order.zzz_items || []).map((item) => ({
      ...item,
      zzz_catalog_item: MOCK_CATALOG_ITEMS[item.zzz_catalog_item_id],
    }));

    const confirmedVenture = order.zzz_confirmed_venture_id
      ? MOCK_VENTURES.find((v) => v.zzz_id === order.zzz_confirmed_venture_id)
      : undefined;

    const currentOfferVenture = order.zzz_current_offer_venture_id
      ? MOCK_VENTURES.find((v) => v.zzz_id === order.zzz_current_offer_venture_id)
      : undefined;

    return {
      ...order,
      zzz_reservation: enrichedReservation,
      zzz_items: enrichedItems,
      zzz_confirmed_venture: confirmedVenture,
      zzz_current_offer_venture: currentOfferVenture,
    };
  });
}

/**
 * Add an order to the mock collection
 */
export function addMockOrder(order: Omit<Order, "zzz_id">) {
  const newOrder: Order = {
    zzz_id: Date.now(),
    ...order,
  };
  ordersState.orders = [newOrder, ...ordersState.orders];
  logger.info("[MOCK API] Created order from zzz_reservation:", { ...newOrder });
  return newOrder;
}

/**
 * Update a mock order with new data
 */
export function updateMockOrder(zzz_id: number, updates: Partial<Order>) {
  ordersState.orders = ordersState.orders.map((o: Order) =>
    Number(o.zzz_id) === Number(zzz_id) ? { ...o, ...updates } : o,
  );
  logger.info(`[MOCK] Updated order ${zzz_id} (new array reference created)`);
}

/**
 * Get a single order by ID
 */
export const getMockOrderById = (zzz_id: number): Order | undefined => {
  return ordersState.orders.find((o: Order) => Number(o.zzz_id) === Number(zzz_id));
};

/**
 * Update an order zzz_status
 */
export function updateMockOrderStatus(zzz_id: number, zzz_status: Order["zzz_global_status"]) {
  ordersState.orders = ordersState.orders.map((o: Order) =>
    Number(o.zzz_id) === Number(zzz_id) ? { ...o, zzz_global_status: zzz_status } : o,
  );
  logger.info(`[MOCK] Updated order zzz_status ${zzz_id} to ${zzz_status}`);
}

/**
 * Add a zzz_reservation to the mock collection
 */
export function addMockReservation(zzz_reservation: Omit<Reservation, "zzz_id">): Reservation {
  const newReservation: Reservation = {
    zzz_id: Math.floor(Math.random() * 100000),
    ...zzz_reservation,
  };
  ordersState.reservations = [newReservation, ...ordersState.reservations];
  logger.info("[MOCK API] Created zzz_reservation:", { ...newReservation });
  return newReservation;
}

/**
 * Update a mock zzz_reservation with new data
 */
export function updateMockReservation(zzz_id: number, updates: Partial<Reservation>) {
  ordersState.reservations = ordersState.reservations.map((r: Reservation) =>
    Number(r.zzz_id) === Number(zzz_id) ? { ...r, ...updates } : r,
  );
  logger.info(`[MOCK] Updated zzz_reservation ${zzz_id} (new array reference created)`);
}

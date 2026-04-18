import { Order, Reservation } from "@repo/shared";
import { getMockUserId } from "./users";
import { logger } from "../services/logger.service";
import { INITIAL_MOCK_ORDERS, MOCK_RESERVATIONS } from "./orders.data";

/**
 * Mock services for orders
 * Consumes centralized data from orders.data.ts
 */

// Shared in-memory state for orders and reservations
const GLOBAL_ORDERS_KEY = "__REWILDING_MOCK_ORDERS_STATE__";

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

// Get all reservations (open reservations with no items yet)
export function getMockReservations(): Reservation[] {
  const userId = getEffectiveUserId();
  return ordersState.reservations.filter((r: Reservation) => r.user_id === userId);
}

// Fallback for user ID to ensure visibility in mock mode
const getEffectiveUserId = () => {
  return getMockUserId();
};

/**
 * Get all mock orders in the state (unfiltered)
 */
export function getAllMockOrders(): Order[] {
  return ordersState.orders.map((order) => {
    const reservation = ordersState.reservations.find((r) => r.id === order.reservation_id);
    return { ...order, reservation };
  });
}

/**
 * Get mock orders for the current user (filtered)
 */
export function getMockOrders(): Order[] {
  const userId = getEffectiveUserId();
  const orders = ordersState.orders.filter((o: Order) => o.user_id === userId);

  return orders.map((order) => {
    const reservation = ordersState.reservations.find((r) => r.id === order.reservation_id);
    return { ...order, reservation };
  });
}

/**
 * Add an order to the mock collection
 */
export function addMockOrder(order: Omit<Order, "id" | "user_id">) {
  const newOrder: Order = {
    id: Date.now(),
    user_id: getEffectiveUserId(),
    ...order,
  };
  ordersState.orders = [newOrder, ...ordersState.orders];
  logger.info("[MOCK API] Created order from reservation:", { ...newOrder });
  return newOrder;
}

/**
 * Update a mock order with new data
 */
export function updateMockOrder(id: number, updates: Partial<Order>) {
  ordersState.orders = ordersState.orders.map((o: Order) =>
    Number(o.id) === Number(id) ? { ...o, ...updates } : o,
  );
  console.log(`[MOCK] Updated order ${id} (new array reference created)`, new Date().toISOString());
}

/**
 * Get a single order by ID
 */
export const getMockOrderById = (id: number): Order | undefined => {
  return ordersState.orders.find((o: Order) => Number(o.id) === Number(id));
};

/**
 * Update an order status
 */
export function updateMockOrderStatus(id: number, status: Order["global_status"]) {
  const order = ordersState.orders.find((o: Order) => Number(o.id) === Number(id));
  if (order) {
    order.global_status = status;
  }
}

import { z } from "zod";
import { OrderStatusSchema, CancelReasonSchema } from "./common";
import { UserSchema } from "./user";
import { VentureSchema } from "./venture";
import { OrderItemSchema } from "./order-item";
import { ReservationSchema } from "./reservation";

/**
 * OrderDbSchema
 * Pure database entity representation (Flat)
 * Mapped to 'orders' table.
 */
export const OrderDbSchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_reservation_id: z.number().int().positive(),
  zzz_catalog_type_id: z.number().int().positive(),
  zzz_confirmed_venture_id: z.number().int().positive().nullable().optional(),
  zzz_notes: z.string().nullable().optional(),
  /**
   * Order Lifecycle Status
   * - SEARCHING: Engine is looking for a venture.
   * - OFFER_PENDING: Entrepreneur notified, waiting for response (Timeout active).
   * - CONFIRMED: Entrepreneur accepted the order.
   * - COMPLETED: Service delivered.
   * - NO_SHOW: Tourist didn't show up.
   * - CANCELLED: Order cancelled.
   * - EXPIRED: No venture available after cascade.
   */
  zzz_global_status: OrderStatusSchema.default("SEARCHING"),
  zzz_cancel_reason: CancelReasonSchema.nullable().optional(),
  zzz_cancelled_at: z.date().nullable().optional(),
  zzz_completed_at: z.date().nullable().optional(),
  zzz_confirmed_at: z.date().nullable().optional(),
  zzz_current_offer_venture_id: z.number().int().positive().nullable().optional(),
  zzz_created_at: z.date(),
  zzz_notify_whatsapp: z.boolean().default(false),
});

import { type OrderItem } from "./order-item";
import { type User } from "./user";
import { type Venture } from "./venture";
import { type Reservation } from "./reservation";

/**
 * OrderSchema (Domain Aggregate)
 * Business entity that includes relations and nested items.
 */
export const OrderSchema: z.ZodType<Order, z.ZodTypeDef, unknown> = OrderDbSchema.extend({
  zzz_items: z.array(OrderItemSchema).default([]),
  zzz_user: UserSchema.optional(),
  zzz_confirmed_venture: VentureSchema.optional(),
  zzz_current_offer_venture: VentureSchema.optional(),
  zzz_reservation: z.lazy(() => ReservationSchema).optional(),
});

export type OrderRow = z.infer<typeof OrderDbSchema>;

export interface Order extends OrderRow {
  zzz_items: OrderItem[];
  zzz_user?: User;
  zzz_confirmed_venture?: Venture;
  zzz_current_offer_venture?: Venture;
  zzz_reservation?: Reservation;
  zzz_current_offer_venture_id?: number | null;
}

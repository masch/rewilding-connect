import { describe, it, expect } from "bun:test";
import { ReservationSchema } from "../reservation";

describe("ReservationSchema", () => {
  it("should validate a valid reservation with nested orders", () => {
    const validReservation = {
      zzz_id: 1,
      zzz_user_id: "550e8400-e29b-41d4-a716-446655440000",
      zzz_service_date: new Date(),
      zzz_time_of_day: "DINNER",
      zzz_status: "CREATED",
      zzz_orders: [
        {
          zzz_id: 10,
          zzz_reservation_id: 1,
          zzz_catalog_type_id: 1,
          zzz_global_status: "SEARCHING",
          zzz_items: [{ zzz_id: 100, zzz_order_id: 10, zzz_catalog_item_id: 5, zzz_quantity: 2, zzz_price: 20 }],
          zzz_created_at: new Date(),
          zzz_notify_whatsapp: false,
        },
      ],
    };
    const result = ReservationSchema.parse(validReservation);
    expect(result.zzz_status).toBe("CREATED");
    expect(result.zzz_orders).toHaveLength(1);
  });

  it("should validate a reservation without orders", () => {
    const reservationOnly = {
      zzz_id: 1,
      zzz_user_id: "550e8400-e29b-41d4-a716-446655440000",
      zzz_service_date: new Date(),
      zzz_time_of_day: "DINNER",
      zzz_status: "CREATED",
    };
    const result = ReservationSchema.parse(reservationOnly);
    expect(result.zzz_status).toBe("CREATED");
    expect(result.zzz_orders).toBeUndefined();
  });
});

import { describe, it, expect } from "bun:test";
import { ReservationStatusSchema, OrderStatusSchema } from "../common";

describe("Common Schemas", () => {
  describe("ReservationStatusSchema", () => {
    it("should validate valid reservation statuses", () => {
      expect(ReservationStatusSchema.parse("CREATED")).toBe("CREATED");
      expect(ReservationStatusSchema.parse("CONFIRMED")).toBe("CONFIRMED");
      expect(ReservationStatusSchema.parse("SEARCHING")).toBe("SEARCHING");
      expect(ReservationStatusSchema.parse("CANCELLED")).toBe("CANCELLED");
    });

    it("should reject invalid reservation statuses", () => {
      expect(() => ReservationStatusSchema.parse("INVALID")).toThrow();
    });
  });

  describe("OrderStatusSchema", () => {
    it("should include SEARCHING", () => {
      expect(OrderStatusSchema.parse("SEARCHING")).toBe("SEARCHING");
    });
  });
});

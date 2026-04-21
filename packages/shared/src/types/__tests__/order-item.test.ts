import { describe, it, expect } from "bun:test";
import { OrderItemSchema } from "../order-item";

describe("OrderItemSchema", () => {
  it("should validate a valid order item", () => {
    const validItem = {
      zzz_id: 1,
      zzz_order_id: 10,
      zzz_catalog_item_id: 100,
      zzz_quantity: 2,
      zzz_price: 15.5,
    };
    expect(OrderItemSchema.parse(validItem)).toEqual(validItem);
  });

  it("should fail with invalid quantity", () => {
    const invalidItem = {
      zzz_id: 1,
      zzz_order_id: 10,
      zzz_catalog_item_id: 100,
      zzz_quantity: 0,
      zzz_price: 15.5,
    };
    expect(() => OrderItemSchema.parse(invalidItem)).toThrow();
  });

  it("should allow price 0", () => {
    const freeItem = {
      zzz_id: 1,
      zzz_order_id: 10,
      zzz_catalog_item_id: 100,
      zzz_quantity: 1,
      zzz_price: 0,
    };
    expect(OrderItemSchema.parse(freeItem)).toEqual(freeItem);
  });
});

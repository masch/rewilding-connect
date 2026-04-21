import { useCartStore } from "../stores/cart.store";

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.getState().resetContext();
  });

  it("should have initial state correctly", () => {
    const state = useCartStore.getState();
    expect(state.selectedDate).toBeNull();
    expect(state.selectedMoment).toBeNull();
    expect(state.cartItems).toEqual([]);
    expect(state.isValid()).toBe(false);
  });

  it("should update context correctly", () => {
    const date = new Date();
    useCartStore.getState().setContext(date, "LUNCH");

    const state = useCartStore.getState();
    expect(state.selectedDate).toEqual(date);
    expect(state.selectedMoment).toBe("LUNCH");
    expect(state.isValid()).toBe(true);
  });

  it("should handle cart items correctly", () => {
    const item = { zzz_catalog_item_id: 1, zzz_quantity: 2, zzz_price: 500 };
    useCartStore.getState().addItem(item);

    let state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual(item);

    // Update quantity (re-add same item ID)
    useCartStore.getState().addItem({ ...item, zzz_quantity: 5 });
    state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].zzz_quantity).toBe(5);

    // Remove item
    useCartStore.getState().removeItem(1);
    state = useCartStore.getState();
    expect(state.cartItems).toHaveLength(0);
  });

  it("should reset correctly including cart", () => {
    useCartStore.getState().addItem({ zzz_catalog_item_id: 1, zzz_quantity: 1, zzz_price: 100 });
    useCartStore.getState().resetContext();

    const state = useCartStore.getState();
    expect(state.cartItems).toEqual([]);
    expect(state.selectedDate).toBeNull();
  });
});

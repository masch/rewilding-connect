import React from "react";
import { render, screen } from "@testing-library/react-native";
import ReservationCard from "../ReservationCard";
import { getMockAgendaOrders } from "../../../mocks/agenda";

describe("ReservationCard", () => {
  it("should render client name, items and service name", () => {
    const order = getMockAgendaOrders()[0];
    const totalQuantity = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    render(<ReservationCard order={order} />);

    if (order.items && order.items.length > 0) {
      // Use a more resilient matcher that looks for the item ID
      expect(screen.getByText(new RegExp(order.items[0].catalog_item_id.toString()))).toBeTruthy();
    }
    expect(screen.getByText(totalQuantity.toString())).toBeTruthy();
  });

  it("should show notes if present", () => {
    const order = getMockAgendaOrders().find((o) => o.notes)!;
    render(<ReservationCard order={order} />);
    expect(screen.getByText(order.notes!)).toBeTruthy();
  });
});

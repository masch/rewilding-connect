/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react-native";
import AgendaScreen from "../agenda";
import { useAgendaStore } from "../../../stores/agenda.store";

// Mock the store to control data
jest.mock("../../../stores/agenda.store");
const mockedUseAgendaStore = jest.mocked(useAgendaStore);

describe("AgendaScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAgendaStore.mockImplementation((selector) => {
      const state = {
        allOrders: [],
        orders: [],
        pendingOrders: [],
        isLoading: false,
        isLoadingPending: false,
        error: null,
        fetchAgenda: jest.fn(),
        fetchPendingOrders: jest.fn(),
        acceptOrder: jest.fn(),
        declineOrder: jest.fn(),
        getOccupationStats: () => ({ occupied: 0, total: 20 }),
        getDayCount: () => 0,
        reset: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return typeof selector === "function" ? selector(state as any) : (state as any);
    }) as any;
  });

  it("should render the screen title", () => {
    render(<AgendaScreen />);
    expect(screen.getByText("agenda.title")).toBeTruthy();
  });

  it("should call fetchAgenda on mount", () => {
    const fetchAgenda = jest.fn();
    mockedUseAgendaStore.mockImplementation((selector) => {
      const state = {
        allOrders: [],
        orders: [],
        pendingOrders: [],
        isLoading: false,
        isLoadingPending: false,
        error: null,
        fetchAgenda: fetchAgenda, // Use the mock we defined
        fetchPendingOrders: jest.fn(),
        acceptOrder: jest.fn(),
        declineOrder: jest.fn(),
        getOccupationStats: () => ({ occupied: 0, total: 20 }),
        getDayCount: () => 0,
        reset: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return typeof selector === "function" ? selector(state as any) : (state as any);
    }) as any;

    render(<AgendaScreen />);
    expect(fetchAgenda).toHaveBeenCalled();
  });

  it("should render reservation notes when present in orders", () => {
    const mockNotes = "Una persona es hipertensa, por favor cocinar sin sal.";
    const mockOrder = {
      zzz_id: 9,
      zzz_reservation_id: 1,
      zzz_catalog_type_id: 1,
      zzz_global_status: "CONFIRMED",
      zzz_confirmed_venture_id: 1,
      zzz_notes: mockNotes,
      zzz_items: [
        {
          zzz_id: 12,
          zzz_order_id: 9,
          zzz_catalog_item_id: 1,
          zzz_quantity: 1,
          zzz_price: 1500,
          zzz_catalog_item: {
            zzz_name_i18n: { es: "Empanadas", en: "Empanadas" },
          },
        },
      ],
      zzz_confirmed_at: new Date(),
      zzz_created_at: new Date(),
      zzz_notify_whatsapp: false,
      zzz_reservation: {
        zzz_id: 1,
        zzz_user_id: "user-1",
        zzz_service_date: new Date(),
        zzz_time_of_day: "DINNER",
        zzz_status: "CONFIRMED",
        zzz_guest_count: 3,
        zzz_user: { alias: "Familia Gómez" },
      },
    } as any;

    mockedUseAgendaStore.mockImplementation((selector) => {
      const state = {
        allOrders: [mockOrder],
        orders: [mockOrder],
        pendingOrders: [],
        isLoading: false,
        isLoadingPending: false,
        error: null,
        fetchAgenda: jest.fn(),
        fetchPendingOrders: jest.fn(),
        acceptOrder: jest.fn(),
        declineOrder: jest.fn(),
        getOccupationStats: () => ({ occupied: 3, total: 20 }),
        getDayCount: () => 1,
        reset: jest.fn(),
      };
      return typeof selector === "function" ? selector(state as any) : (state as any);
    }) as any;

    render(<AgendaScreen />);

    // Verify that the notes are rendered
    expect(screen.getByText(mockNotes)).toBeTruthy();
  });
});

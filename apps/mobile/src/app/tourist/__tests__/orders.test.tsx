/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react-native";
import OrderScreen from "../orders";
import { useReservationStore } from "../../../stores/reservation.store";
import { useAuthStore } from "../../../stores/auth.store";
import { useCatalogStore } from "../../../stores/catalog.store";

// Mock the stores
jest.mock("../../../stores/reservation.store");
jest.mock("../../../stores/auth.store");
jest.mock("../../../stores/catalog.store");

const mockedUseReservationStore = jest.mocked(useReservationStore);
const mockedUseAuthStore = jest.mocked(useAuthStore);
const mockedUseCatalogStore = jest.mocked(useCatalogStore);

describe("OrderScreen (Tourist)", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default auth state: authenticated tourist
    mockedUseAuthStore.mockImplementation((selector) => {
      const state = {
        currentUser: { id: "tourist_1", role: "TOURIST" },
        isAuthenticated: true,
      };
      return typeof selector === "function" ? selector(state as any) : (state as any);
    });

    // Default catalog state
    mockedUseCatalogStore.mockImplementation((selector) => {
      const state = {
        services: [],
        fetchServices: jest.fn(),
      };
      return typeof selector === "function" ? selector(state as any) : (state as any);
    });

    // Default reservation state
    mockedUseReservationStore.mockImplementation((selector) => {
      const state = {
        activeOrders: [],
        historyOrders: [],
        isLoading: false,
        error: null,
        selectedTab: "active",
        fetchOrders: jest.fn(),
        cancelOrder: jest.fn(),
        addOrder: jest.fn(),
        updateOrder: jest.fn(),
        moveOrders: jest.fn(),
        setTab: jest.fn(),
      };
      return typeof selector === "function" ? selector(state as any) : (state as any);
    }) as any;
  });

  it("should render reservation notes when present in active orders", () => {
    const mockNotes = "Alérgico a las nueces y frutos secos.";
    const mockOrder = {
      zzz_id: 10,
      zzz_reservation_id: 2,
      zzz_catalog_type_id: 1,
      zzz_global_status: "CONFIRMED",
      zzz_confirmed_venture_id: 1,
      zzz_notes: mockNotes,
      zzz_items: [
        {
          zzz_id: 15,
          zzz_order_id: 10,
          zzz_catalog_item_id: 2,
          zzz_quantity: 2,
          zzz_price: 2000,
          zzz_catalog_item: {
            zzz_name_i18n: { es: "Guiso", en: "Stew" },
          },
        },
      ],
      zzz_confirmed_at: new Date(),
      zzz_created_at: new Date(),
      zzz_notify_whatsapp: false,
      zzz_reservation: {
        zzz_id: 2,
        zzz_user_id: "tourist_1",
        zzz_service_date: new Date(),
        zzz_time_of_day: "LUNCH",
        zzz_status: "CONFIRMED",
        zzz_guest_count: 2,
      },
      zzz_confirmed_venture: {
        name: "Parador Don Esteban",
      },
    };

    mockedUseReservationStore.mockImplementation((selector) => {
      const state = {
        activeOrders: [mockOrder],
        historyOrders: [],
        isLoading: false,
        error: null,
        selectedTab: "active",
        fetchOrders: jest.fn(),
        cancelOrder: jest.fn(),
        addOrder: jest.fn(),
        updateOrder: jest.fn(),
        moveOrders: jest.fn(),
        setTab: jest.fn(),
      };
      return typeof selector === "function" ? selector(state as any) : (state as any);
    }) as any;

    render(<OrderScreen />);

    // Verify that the notes are rendered
    expect(screen.getByText(mockNotes)).toBeTruthy();
  });
});

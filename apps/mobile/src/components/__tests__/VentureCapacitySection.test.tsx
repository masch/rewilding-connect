import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import VentureCapacitySection from "../VentureCapacitySection";
import { useProjectStore } from "../../stores/project.store";

// Mock hooks and services
jest.mock("../../services/logger.service", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("../../services/venture.service", () => ({
  VentureService: {
    getVentureByUserId: jest.fn().mockResolvedValue({
      zzz_id: 1,
      zzz_name: "Test Venture",
      zzz_max_capacity: 50,
      zzz_max_capacity_limit: 50,
    }),
    updateVenture: jest.fn().mockResolvedValue({ success: true }),
  },
}));

jest.mock("../../hooks/useI18n", () => ({
  useTranslations: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      if (params?.limit) return `${key} ${params.limit}`;
      return key;
    },
  }),
}));

describe("VentureCapacitySection", () => {
  const userId = "entrepreneur_001";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render capacity adjustment UI even if selectedProject is missing (using venture fallback)", async () => {
    useProjectStore.setState({ selectedProject: null });

    render(<VentureCapacitySection userId={userId} />);

    // Now it should NOT show the error, but the loading first, then the UI
    await waitFor(() => {
      expect(screen.getByText("venture.capacity_label")).toBeTruthy();
    });

    // Check that it shows the capacity from the venture mock (50)
    expect(screen.getByTestId("capacity-text").props.children).toBe(50);
  });
});

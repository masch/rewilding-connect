import React from "react";
import { render } from "@testing-library/react-native";
import StatusScreen from "../app/system-status";
import { StatusService } from "../services/status.service";

// Mock the service
jest.mock("../services/status.service", () => ({
  StatusService: {
    fetchBackendHealth: jest.fn(() =>
      Promise.resolve({
        status: "ok",
        uptime: 3600,
        database: { status: "ok", latency: "10ms" },
      }),
    ),
    fetchGitHubRuns: jest.fn(() =>
      Promise.resolve([
        {
          name: "CI",
          status: "completed",
          conclusion: "success",
          head_commit: { id: "123", message: "ok" },
          created_at: new Date().toISOString(),
        },
        {
          name: "Deploy Web",
          status: "completed",
          conclusion: "success",
          head_commit: { id: "456", message: "ok" },
          created_at: new Date().toISOString(),
        },
      ]),
    ),
    fetchCheckRuns: jest.fn(() => Promise.resolve({ annotations_count: 0 })),
  },
}));

describe("StatusScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display operational status when services are ok", async () => {
    const { findAllByText, findAllByTestId } = render(<StatusScreen />);

    // Check for title
    expect(await findAllByText("status.title")).toBeTruthy();

    // Check for status cards (there should be multiple)
    const cards = await findAllByTestId("status-title");
    expect(cards.length).toBeGreaterThan(0);

    // Check for operational status labels
    const operationalLabels = await findAllByText("status.operational");
    expect(operationalLabels.length).toBeGreaterThan(0);
  });

  it("should display outage status when backend is down", async () => {
    (StatusService.fetchBackendHealth as jest.Mock).mockResolvedValue({
      status: "error",
      database: { status: "error" },
    });

    const { findAllByText } = render(<StatusScreen />);

    const outageLabels = await findAllByText("status.outage");
    expect(outageLabels.length).toBeGreaterThan(0);
  });

  it("should show error message when fetch fails", async () => {
    (StatusService.fetchBackendHealth as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { findAllByText } = render(<StatusScreen />);

    const unreachableLabels = await findAllByText("status.unreachable");
    expect(unreachableLabels.length).toBeGreaterThan(0);
  });

  it("should display outage status for CI/CD when GitHub fetch fails", async () => {
    (StatusService.fetchGitHubRuns as jest.Mock).mockRejectedValue(new Error("GH API 404"));

    const { findAllByText } = render(<StatusScreen />);

    // Since CI and Deploy Web both depend on GitHub, they should both show unreachable (with emoji prefix on cards)
    const unreachableLabels = await findAllByText(/status\.unreachable/);
    expect(unreachableLabels.length).toBeGreaterThanOrEqual(2);
  });
});

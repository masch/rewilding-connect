import { MockStatusService, RestStatusService } from "../status.service";

// Mock global fetch
globalThis.fetch = jest.fn();

describe("StatusService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("RestStatusService", () => {
    it("should fetch backend health with latency and runs", async () => {
      const mockHealth = {
        status: "ok",
        timestamp: "2024-03-20T12:00:00Z",
        uptime: 3600,
        environment: "development",
        database: { status: "ok", latency: "10ms" },
        github: { runs: [{ id: 1, name: "CI" }] },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockHealth,
      });

      const health = await RestStatusService.fetchBackendHealth();
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("/health"));
      expect(health.github.runs.length).toBe(1);
    });

    it("should fetch github runs from backend health", async () => {
      const mockHealth = {
        github: {
          runs: [
            {
              id: 1,
              name: "CI",
              status: "completed",
              conclusion: "success",
              head_commit: { message: "test" },
            },
          ],
        },
      };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockHealth,
      });

      const runs = await RestStatusService.fetchGitHubRuns();
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("/health"));
      expect(runs.length).toBe(1);
      expect(runs[0].name).toBe("CI");
    });

    it("should fetch check runs from backend proxy", async () => {
      const mockCheckData = { annotations_count: 5, messages: ["Warn 1"] };

      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCheckData,
      });

      const result = await RestStatusService.fetchCheckRuns("ref123");
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/health/check-runs/ref123"),
      );
      expect(result.annotations_count).toBe(5);
      expect(result.messages[0]).toBe("Warn 1");
    });

    it("should handle backend health failure", async () => {
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(RestStatusService.fetchBackendHealth()).rejects.toThrow("Health check failed");
    });
  });

  describe("MockStatusService", () => {
    it("should return mock health data with empty runs", async () => {
      const health = await MockStatusService.fetchBackendHealth();
      expect(health.status).toBe("ok");
      expect(health.github.runs).toEqual([]);
    });

    it("should return empty runs and messages in mock mode", async () => {
      const runs = await MockStatusService.fetchGitHubRuns();
      const checks = await MockStatusService.fetchCheckRuns("any");

      expect(runs).toEqual([]);
      expect(checks).toEqual({ annotations_count: 0, messages: [] });
    });
  });
});

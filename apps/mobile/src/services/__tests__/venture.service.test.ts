import { MockVentureService, RestVentureService } from "../venture.service";
import { MOCK_VENTURES } from "@repo/shared";

// Mock global fetch
globalThis.fetch = jest.fn();

describe("VentureService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("MockVentureService", () => {
    it("should find a venture by userId (Maria -> Parador Don Esteban)", async () => {
      const mariaId = "entrepreneur_001";
      const venture = await MockVentureService.getVentureByUserId(mariaId);
      expect(venture).toBeDefined();
      expect(venture?.name).toBe("Parador Don Esteban");
    });

    it("should find a venture by userId for a collaborator (Pedro -> Parador Don Esteban)", async () => {
      const pedroId = "entrepreneur_005";
      const venture = await MockVentureService.getVentureByUserId(pedroId);
      expect(venture).toBeDefined();
      expect(venture?.name).toBe("Parador Don Esteban");
      expect(venture?.id).toBe(1);
    });

    it("should update venture capacity", async () => {
      const ventureId = 1;
      const newCapacity = 42;
      const updated = await MockVentureService.updateVenture(ventureId, {
        zzz_max_capacity: newCapacity,
      });

      expect(updated.zzz_max_capacity).toBe(newCapacity);

      // Verify persistence in mock state
      const mariaId = "entrepreneur_001";
      const venture = await MockVentureService.getVentureByUserId(mariaId);
      expect(venture?.zzz_max_capacity).toBe(newCapacity);
    });

    it("should return null if user has no venture", async () => {
      const unknownUserId = "unknown_user";
      const venture = await MockVentureService.getVentureByUserId(unknownUserId);
      expect(venture).toBeNull();
    });
  });

  describe("RestVentureService", () => {
    it("should fetch venture by userId via API", async () => {
      const mockVenture = MOCK_VENTURES[0];
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockVenture,
      });

      const venture = await RestVentureService.getVentureByUserId("user123");
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/ventures/user/user123"),
      );
      expect(venture?.id).toBe(mockVenture.id);
    });

    it("should update venture via API", async () => {
      const mockVenture = { ...MOCK_VENTURES[0], zzz_max_capacity: 50 };
      (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockVenture,
      });

      const updated = await RestVentureService.updateVenture(1, { zzz_max_capacity: 50 });
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/ventures/1"),
        expect.objectContaining({ method: "PATCH" }),
      );
      expect(updated.zzz_max_capacity).toBe(50);
    });
  });
});

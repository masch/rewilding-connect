import { Venture, MOCK_VENTURES, MOCK_VENTURE_MEMBERS } from "@repo/shared";
import env from "../config/env";
import { logger } from "./logger.service";

/**
 * Venture Service Interface
 */
export interface VentureServiceInterface {
  getVentureByUserId(userId: string): Promise<Venture | null>;
  updateVenture(id: number, data: Partial<Venture>): Promise<Venture>;
}

// Internal mock state to allow updates during the session
const mockVentures = [...MOCK_VENTURES];

/**
 * 🛠️ MOCK Implementation
 */
export const MockVentureService: VentureServiceInterface = {
  getVentureByUserId: async (userId: string) => {
    await new Promise((r) => setTimeout(r, 500));

    // Find membership
    const membership = MOCK_VENTURE_MEMBERS.find((m) => m.userId === userId);
    if (!membership) return null;

    // Find venture
    return mockVentures.find((v) => v.id === membership.ventureId) || null;
  },

  updateVenture: async (id: number, data: Partial<Venture>) => {
    await new Promise((r) => setTimeout(r, 600));

    const index = mockVentures.findIndex((v) => v.id === id);
    if (index === -1) throw new Error("Venture not found");

    const updatedVenture = {
      ...mockVentures[index],
      ...data,
      updatedAt: new Date(),
    };

    mockVentures[index] = updatedVenture;

    logger.info(`[MOCK API] Updated venture ${id}:`, data as unknown as Record<string, unknown>);
    return updatedVenture;
  },
};

/**
 * 📡 REST API Implementation
 */
export const RestVentureService: VentureServiceInterface = {
  getVentureByUserId: async (userId: string) => {
    const response = await fetch(`${env.API_URL}/ventures/user/${userId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("API error fetching venture by user ID");
    }
    return response.json();
  },

  updateVenture: async (id: number, data: Partial<Venture>) => {
    const response = await fetch(`${env.API_URL}/ventures/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("API error updating venture");
    return response.json();
  },
};

/**
 * Smart Switch
 */
export const VentureService = env.USE_MOCKS ? MockVentureService : RestVentureService;

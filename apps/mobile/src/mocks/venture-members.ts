import { MOCK_VENTURE_MEMBERS } from "./venture-members.data";

/**
 * Get venture IDs assigned to a specific zzz_user
 */
export function getVentureIdsByUserId(userId: string): number[] {
  return MOCK_VENTURE_MEMBERS.filter((m) => m.zzz_user_id === userId).map((m) => m.zzz_venture_id);
}

/**
 * Check if a zzz_user has access to a specific venture
 */
export function userHasVentureAccess(userId: string, ventureId: number): boolean {
  return MOCK_VENTURE_MEMBERS.some(
    (m) => m.zzz_user_id === userId && m.zzz_venture_id === ventureId,
  );
}

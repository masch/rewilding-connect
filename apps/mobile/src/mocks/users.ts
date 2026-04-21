/**
 * Mock Users - Re-exports from centralized users.data.ts
 * Functions that depend on auth-state are defined here to avoid circular deps
 */

import { User, type UserRole } from "@repo/shared";
import { MOCK_USERS, MOCK_USER_TOURIST_WITH_ORDERS } from "./users.data";
import { mockGetCurrentUser } from "../services/auth-state";

export type { User, UserRole };

// Derive demo users from MOCK_USERS - same as User[] but typed for UI
export function getDemoUsersByRole(role: UserRole): User[] {
  const users = MOCK_USERS.filter((u) => u.zzz_user_type === role);
  return users;
}

export function findUserByAlias(zzz_alias: string): User | undefined {
  return MOCK_USERS.find((u) => u.zzz_user_type === "TOURIST" && u.zzz_alias === zzz_alias);
}

export function findUserByEmail(zzz_email: string): User | undefined {
  return MOCK_USERS.find((u) => u.zzz_email === zzz_email);
}

export function getMockUserId(): string {
  const zzz_user = mockGetCurrentUser();
  return zzz_user?.zzz_id ?? MOCK_USER_TOURIST_WITH_ORDERS.zzz_id;
}

export function isMockUserLoggedIn(): boolean {
  return mockGetCurrentUser() !== null;
}

export function getDefaultMockUserId(): string {
  return MOCK_USER_TOURIST_WITH_ORDERS.zzz_id;
}

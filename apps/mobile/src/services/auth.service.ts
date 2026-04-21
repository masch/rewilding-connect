import { z } from "zod";
import type { ZodIssue, ZodSchema } from "zod";
import { User, CreateUserSchema, CreateUserInput } from "@repo/shared";
import env from "../config/env";
import { findUserByAlias, findUserByEmail } from "../mocks/users";
import { getAuthState } from "./auth-state";

/**
 * Validate data using Zod schemas
 */
function validateData<S extends ZodSchema>(data: unknown, schema: S): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues
      .map((i: ZodIssue) => `${i.path.join(".")}: ${i.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
  return result.data;
}

interface AuthServiceInterface {
  login(userData: CreateUserInput): Promise<User>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}

const MockAuthService: AuthServiceInterface = {
  login: async (userData: CreateUserInput) => {
    await new Promise((r) => setTimeout(r, 500));
    // Validate input using Zod
    const validated = validateData(userData, CreateUserSchema);
    // Check if user exists in mock data
    const alias = validated.zzz_alias ?? "";
    const existingUser = findUserByAlias(alias);
    const state = getAuthState();
    if (existingUser) {
      state.currentUser = {
        ...existingUser,
        zzz_last_login_at: new Date(),
      };
      return state.currentUser;
    }
    // Create new user
    const newUser: User = {
      zzz_id: `user_${state.nextId++}`,
      zzz_alias: validated.zzz_alias,
      zzz_email: validated.zzz_email,
      zzz_first_name: validated.zzz_first_name,
      zzz_last_name: validated.zzz_last_name,
      zzz_whatsapp: validated.zzz_whatsapp,
      zzz_user_type: validated.zzz_user_type ?? "TOURIST",
      zzz_failed_login_attempts: 0,
      zzz_locked_until: null,
      zzz_last_login_at: new Date(),
      zzz_is_active: true,
      zzz_created_at: new Date(),
    };
    state.users.push(newUser);
    state.currentUser = newUser;
    return state.currentUser;
  },

  getCurrentUser: async () => {
    await new Promise((r) => setTimeout(r, 200));
    return getAuthState().currentUser;
  },

  logout: async () => {
    await new Promise((r) => setTimeout(r, 200));
    getAuthState().currentUser = null;
  },
};

const RestAuthService: AuthServiceInterface = {
  login: async (userData: CreateUserInput) => {
    const response = await fetch(`${env.API_URL}/auth/tourist/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("API error creating user");
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${env.API_URL}/auth/me`);
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("API error fetching user");
    return response.json();
  },

  logout: async () => {
    await fetch(`${env.API_URL}/auth/logout`, { method: "POST" });
  },
};

export const AuthService = env.USE_MOCKS ? MockAuthService : RestAuthService;

/**
 * Mock login - searches in mock users or creates new one
 * - Tourists: found by alias
 * - Entrepreneurs/Admins: found by email
 */
export function mockLogin(userData: CreateUserInput): User {
  const state = getAuthState();

  // Check if user exists in mock data
  // Try alias first (for tourists)
  if (userData.zzz_alias) {
    const existingUser = findUserByAlias(userData.zzz_alias);
    if (existingUser) {
      state.currentUser = {
        ...existingUser,
        zzz_last_login_at: new Date(),
      };
      return state.currentUser;
    }
  }

  // Try email (for entrepreneurs/admins)
  if (userData.zzz_email) {
    const existingUser = findUserByEmail(userData.zzz_email);
    if (existingUser) {
      state.currentUser = {
        ...existingUser,
        zzz_last_login_at: new Date(),
      };
      return state.currentUser;
    }
  }

  // Create new user only if not found (convert null to undefined)
  const newUser: User = {
    zzz_id: `user_${state.nextId++}`,
    zzz_alias: userData.zzz_alias ?? null,
    zzz_email: userData.zzz_email ?? null,
    zzz_first_name: userData.zzz_first_name ?? null,
    zzz_last_name: userData.zzz_last_name ?? null,
    zzz_whatsapp: userData.zzz_whatsapp ?? null,
    zzz_user_type: userData.zzz_user_type ?? "TOURIST",
    zzz_failed_login_attempts: 0,
    zzz_locked_until: null,
    zzz_last_login_at: new Date(),
    zzz_is_active: true,
    zzz_created_at: new Date(),
  };
  state.users.push(newUser);
  state.currentUser = newUser;
  return state.currentUser;
}

export { mockLogout, mockGetCurrentUser, mockSetCurrentUser } from "./auth-state";

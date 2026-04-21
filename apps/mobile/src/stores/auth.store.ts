import { create } from "zustand";
import { User, CreateUserInput, UserRole } from "@repo/shared";
import env from "../config/env";
import { mockLogin, mockLogout } from "../services/auth.service";

interface AuthState {
  // User state - using User entity from shared package (DER)
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Role for tab routing
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Actions
  login: (userData: CreateUserInput) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock auth for early development - will be replaced with real auth API
export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  userRole: "TOURIST",

  setUserRole: (role) => set({ userRole: role }),

  login: (userData) => {
    if (env.USE_MOCKS) {
      const user = mockLogin(userData);
      set({
        currentUser: user,
        isAuthenticated: true,
        isLoading: false,
        userRole: user.zzz_user_type,
      });
    } else {
      // TODO: Call real auth API
      const user: User = {
        zzz_id: `user_${Date.now()}`,
        zzz_alias: userData.zzz_alias,
        zzz_email: userData.zzz_email,
        zzz_first_name: userData.zzz_first_name,
        zzz_last_name: userData.zzz_last_name,
        zzz_whatsapp: userData.zzz_whatsapp,
        zzz_user_type: userData.zzz_user_type ?? "TOURIST",
        zzz_failed_login_attempts: 0,
        zzz_locked_until: null,
        zzz_last_login_at: new Date(),
        zzz_is_active: true,
        zzz_created_at: new Date(),
      };
      set({
        currentUser: user,
        isAuthenticated: true,
        isLoading: false,
        userRole: user.zzz_user_type,
      });
    }
  },

  logout: () => {
    if (env.USE_MOCKS) {
      mockLogout();
    }
    set({ currentUser: null, isAuthenticated: false, userRole: "TOURIST" });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));

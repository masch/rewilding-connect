import { User } from "@repo/shared";

// Tourist users mocks
export const MOCK_USER_TOURIST_WITH_ORDERS: User = {
  zzz_id: "tourist_001",
  zzz_alias: "Familia Gómez",
  zzz_email: null,
  zzz_first_name: "Juan",
  zzz_last_name: "Gómez",
  zzz_whatsapp: "+5493624123456",
  zzz_user_type: "TOURIST",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-10T10:30:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2024-01-01T00:00:00Z"),
};

export const MOCK_USER_TOURIST_WITHOUT_ORDERS: User = {
  zzz_id: "tourist_002",
  zzz_alias: "Adventure Seekers",
  zzz_email: null,
  zzz_first_name: "Maria",
  zzz_last_name: "López",
  zzz_whatsapp: "+5493624987654",
  zzz_user_type: "TOURIST",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-09T15:45:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2024-01-05T00:00:00Z"),
};

// Entrepreneurs users mocks
export const MOCK_USER_ENTREPRENEUR_WITH_ORDERS: User = {
  zzz_id: "entrepreneur_001",
  zzz_alias: null,
  zzz_email: "maria@forst-stew.com",
  zzz_first_name: "Maria",
  zzz_last_name: "González",
  zzz_whatsapp: "+5493624111111",
  zzz_user_type: "ENTREPRENEUR",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-11T08:00:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2023-06-15T00:00:00Z"),
};

export const MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS: User = {
  zzz_id: "entrepreneur_002",
  zzz_alias: null,
  zzz_email: "pepe@regional-grill.com",
  zzz_first_name: "José",
  zzz_last_name: "Martínez",
  zzz_whatsapp: "+5493624222222",
  zzz_user_type: "ENTREPRENEUR",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-10T14:30:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2023-08-20T00:00:00Z"),
};

// Admin users mocks
export const MOCK_USER_ADMIN: User = {
  zzz_id: "admin_001",
  zzz_alias: null,
  zzz_email: "admin@impenetrable.com",
  zzz_first_name: "Admin",
  zzz_last_name: "Principal",
  zzz_whatsapp: "+5493624000001",
  zzz_user_type: "ADMIN",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-11T07:00:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2023-01-01T00:00:00Z"),
};

/**
 * Pure mock data for users to avoid circular dependencies
 */
export const MOCK_USER_ENTREPRENEUR_LUCIA: User = {
  zzz_id: "entrepreneur_003",
  zzz_alias: null,
  zzz_email: "lucia@river-tours.com",
  zzz_first_name: "Lucía",
  zzz_last_name: "Fernández",
  zzz_whatsapp: "+5493624333333",
  zzz_user_type: "ENTREPRENEUR",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-11T09:15:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2023-09-05T00:00:00Z"),
};

export const MOCK_USER_ENTREPRENEUR_CARLOS: User = {
  zzz_id: "entrepreneur_004",
  zzz_alias: null,
  zzz_email: "carlos@chaqueño-outdoor.com",
  zzz_first_name: "Carlos",
  zzz_last_name: "Sosa",
  zzz_whatsapp: "+5493624444444",
  zzz_user_type: "ENTREPRENEUR",
  zzz_failed_login_attempts: 0,
  zzz_locked_until: null,
  zzz_last_login_at: new Date("2026-04-09T16:00:00Z"),
  zzz_is_active: true,
  zzz_created_at: new Date("2023-10-12T00:00:00Z"),
};

/**
 * Pure mock data for users to avoid circular dependencies
 */
export const MOCK_USERS: User[] = [
  // === TOURISTS (3) ===
  MOCK_USER_TOURIST_WITH_ORDERS,
  MOCK_USER_TOURIST_WITHOUT_ORDERS,
  {
    zzz_id: "tourist_003",
    zzz_alias: "Viaje Familiar",
    zzz_email: null,
    zzz_first_name: "Carlos",
    zzz_last_name: "Rodríguez",
    zzz_whatsapp: "+5493624556789",
    zzz_user_type: "TOURIST",
    zzz_failed_login_attempts: 0,
    zzz_locked_until: null,
    zzz_last_login_at: new Date("2026-04-08T09:00:00Z"),
    zzz_is_active: true,
    zzz_created_at: new Date("2024-02-10T00:00:00Z"),
  },

  // === ENTREPRENEURS (4) ===
  MOCK_USER_ENTREPRENEUR_WITH_ORDERS,
  MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS,
  MOCK_USER_ENTREPRENEUR_LUCIA,
  MOCK_USER_ENTREPRENEUR_CARLOS,

  // === ADMINS (2) ===
  MOCK_USER_ADMIN,
  {
    zzz_id: "admin_002",
    zzz_alias: null,
    zzz_email: "soporte@impenetrable.com",
    zzz_first_name: "Soporte",
    zzz_last_name: "Técnico",
    zzz_whatsapp: "+5493624000002",
    zzz_user_type: "ADMIN",
    zzz_failed_login_attempts: 0,
    zzz_locked_until: null,
    zzz_last_login_at: new Date("2026-04-10T18:30:00Z"),
    zzz_is_active: true,
    zzz_created_at: new Date("2023-03-15T00:00:00Z"),
  },
];

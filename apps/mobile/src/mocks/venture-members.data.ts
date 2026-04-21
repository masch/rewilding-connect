import { VentureMember } from "@repo/shared";
import {
  MOCK_USER_ENTREPRENEUR_WITH_ORDERS,
  MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS,
  MOCK_USER_ENTREPRENEUR_LUCIA,
  MOCK_USER_ENTREPRENEUR_CARLOS,
} from "./users.data";
import {
  MOCK_VENTURE_WITH_ORDERS,
  MOCK_VENTURE_JOSE,
  MOCK_VENTURE_CAMPO_ALEGRE,
  MOCK_VENTURE_PLAZOLETA_NANCY,
} from "./ventures.data";

/**
 * Mock assignments of entrepreneurs to ventures
 * Matches DER table 'venture_members'
 */
export const MOCK_VENTURE_MEMBERS: VentureMember[] = [
  {
    zzz_id: 1,
    zzz_user_id: MOCK_USER_ENTREPRENEUR_WITH_ORDERS.zzz_id, // Maria González
    zzz_venture_id: MOCK_VENTURE_WITH_ORDERS.zzz_id, // Parador Don Esteban
    zzz_role: "MANAGER",
  },
  {
    zzz_id: 2,
    zzz_user_id: MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS.zzz_id, // José Martínez
    zzz_venture_id: MOCK_VENTURE_JOSE.zzz_id, // Parador Bermejito
    zzz_role: "MANAGER",
  },
  {
    zzz_id: 3,
    zzz_user_id: MOCK_USER_ENTREPRENEUR_LUCIA.zzz_id, // Lucía Fernández
    zzz_venture_id: MOCK_VENTURE_CAMPO_ALEGRE.zzz_id, // Parador Campo Alegre
    zzz_role: "MANAGER",
  },
  {
    zzz_id: 4,
    zzz_user_id: MOCK_USER_ENTREPRENEUR_CARLOS.zzz_id, // Carlos Sosa
    zzz_venture_id: MOCK_VENTURE_PLAZOLETA_NANCY.zzz_id, // Plazoleta Nancy
    zzz_role: "MANAGER",
  },
];

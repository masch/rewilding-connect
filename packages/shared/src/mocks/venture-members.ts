import { VentureMember } from "../types/venture-member";
import {
  MOCK_USER_ENTREPRENEUR_WITH_ORDERS,
  MOCK_USER_ENTREPRENEUR_PEDRO,
  MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS,
  MOCK_USER_ENTREPRENEUR_LUCIA,
  MOCK_USER_ENTREPRENEUR_CARLOS,
} from "./users";
import {
  MOCK_VENTURE_WITH_ORDERS,
  MOCK_VENTURE_PARADOR_BERMEJITO,
  MOCK_VENTURE_CAMPO_ALEGRE,
  MOCK_VENTURE_PLAZOLETA_NANCY,
} from "./ventures";

export const MOCK_VENTURE_MEMBERS: VentureMember[] = [
  {
    id: 1,
    ventureId: MOCK_VENTURE_WITH_ORDERS.id, // Parador Don Esteban
    userId: MOCK_USER_ENTREPRENEUR_WITH_ORDERS.id, // Maria
    role: "OWNER",
  },
  {
    id: 2,
    ventureId: MOCK_VENTURE_WITH_ORDERS.id, // Parador Don Esteban
    userId: MOCK_USER_ENTREPRENEUR_PEDRO.id, // Pedro
    role: "MANAGER",
  },
  {
    id: 3,
    ventureId: MOCK_VENTURE_PARADOR_BERMEJITO.id,
    userId: MOCK_USER_ENTREPRENEUR_WITHOUT_ORDERS.id, // José
    role: "OWNER",
  },
  {
    id: 4,
    ventureId: MOCK_VENTURE_CAMPO_ALEGRE.id, // Parador Campo Alegre
    userId: MOCK_USER_ENTREPRENEUR_LUCIA.id, // Lucía
    role: "OWNER",
  },
  {
    id: 5,
    ventureId: MOCK_VENTURE_PLAZOLETA_NANCY.id, // Plazoleta Nancy
    userId: MOCK_USER_ENTREPRENEUR_CARLOS.id, // Carlos
    role: "OWNER",
  },
];

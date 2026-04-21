import { Venture } from "@repo/shared";
import { SERVICE_CATEGORY_IDS } from "./catalog";

export const MOCK_VENTURE_WITH_ORDERS: Venture = {
  zzz_id: 1,
  zzz_catalog_type_id: SERVICE_CATEGORY_IDS.GASTRONOMY,
  zzz_name: "Parador Don Esteban",
  zzz_description: "Comida casera con amor",
  zzz_address: "Calle Falsa 123, Bermejito",
  zzz_latitude: -25.0,
  zzz_longitude: -60.0,
  zzz_max_capacity: 20,
  zzz_is_paused: false,
  zzz_is_active: true,
  zzz_role_type_id: 1,
  zzz_cascade_order: 0,
};

export const MOCK_VENTURE_JOSE: Venture = {
  zzz_id: 2,
  zzz_catalog_type_id: SERVICE_CATEGORY_IDS.GASTRONOMY,
  zzz_name: "Parador Bermejito",
  zzz_description: "Los mejores asados del Chaco",
  zzz_address: "Ruta 95, Km 20",
  zzz_latitude: -25.1,
  zzz_longitude: -60.1,
  zzz_max_capacity: 50,
  zzz_is_paused: false,
  zzz_is_active: true,
  zzz_role_type_id: 1,
  zzz_cascade_order: 1,
};

export const MOCK_VENTURE_CAMPO_ALEGRE: Venture = {
  zzz_id: 3,
  zzz_catalog_type_id: SERVICE_CATEGORY_IDS.GASTRONOMY,
  zzz_name: "Parador Campo Alegre",
  zzz_description: "Comida casera con amor",
  zzz_address: "Calle Falsa 123, Bermejito",
  zzz_latitude: -25.0,
  zzz_longitude: -60.0,
  zzz_max_capacity: 20,
  zzz_is_paused: false,
  zzz_is_active: true,
  zzz_role_type_id: 1,
  zzz_cascade_order: 0,
};

export const MOCK_VENTURE_PLAZOLETA_NANCY: Venture = {
  zzz_id: 4,
  zzz_catalog_type_id: SERVICE_CATEGORY_IDS.GASTRONOMY,
  zzz_name: "Plazoleta Nancy",
  zzz_description: "Comida casera con amor",
  zzz_address: "Calle Falsa 123, Bermejito",
  zzz_latitude: -25.0,
  zzz_longitude: -60.0,
  zzz_max_capacity: 20,
  zzz_is_paused: false,
  zzz_is_active: true,
  zzz_role_type_id: 1,
  zzz_cascade_order: 0,
};

export const MOCK_VENTURES: Venture[] = [
  MOCK_VENTURE_WITH_ORDERS,
  MOCK_VENTURE_JOSE,
  MOCK_VENTURE_CAMPO_ALEGRE,
  MOCK_VENTURE_PLAZOLETA_NANCY,
];

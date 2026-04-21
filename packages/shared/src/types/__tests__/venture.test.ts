import { describe, it, expect } from "bun:test";
import { VentureSchema } from "../venture";

describe("VentureSchema", () => {
  it("should validate a venture with members", () => {
    const ventureWithMembers = {
      zzz_id: 1,
      zzz_catalog_type_id: 10,
      zzz_name: "Parador A",
      zzz_address: "Calle 123",
      zzz_latitude: -24.5,
      zzz_longitude: -60.2,
      zzz_role_type_id: 1,
      zzz_max_capacity: 20,
      zzz_is_paused: false,
      zzz_is_active: true,
      zzz_members: [
        {
          zzz_id: 1,
          zzz_venture_id: 1,
          zzz_user_id: "550e8400-e29b-41d4-a716-446655440000",
          zzz_role: "MANAGER",
        },
      ],
    };
    const result = VentureSchema.parse(ventureWithMembers);
    expect(result.zzz_members).toHaveLength(1);
    expect(result.zzz_members?.[0].zzz_role).toBe("MANAGER");
  });

  it("should validate a venture with empty members array", () => {
    const ventureWithEmptyMembers = {
      zzz_id: 1,
      zzz_catalog_type_id: 10,
      zzz_name: "Parador A",
      zzz_address: "Calle 123",
      zzz_latitude: -24.5,
      zzz_longitude: -60.2,
      zzz_role_type_id: 1,
      zzz_max_capacity: 20,
      zzz_is_paused: false,
      zzz_is_active: true,
      zzz_members: [],
    };
    const result = VentureSchema.parse(ventureWithEmptyMembers);
    expect(result.zzz_members).toHaveLength(0);
  });
});

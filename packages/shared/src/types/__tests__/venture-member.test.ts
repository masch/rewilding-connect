import { describe, it, expect } from "bun:test";
import { VentureMemberSchema } from "../venture-member";

describe("VentureMemberSchema", () => {
  it("should validate a valid venture member", () => {
    const validMember = {
      zzz_id: 1,
      zzz_venture_id: 10,
      zzz_user_id: "123e4567-e89b-12d3-a456-426614174000",
      zzz_role: "MANAGER",
    };
    expect(VentureMemberSchema.parse(validMember)).toEqual(validMember);
  });

  it("should fail with invalid user_id (not a uuid)", () => {
    const invalidMember = {
      zzz_id: 1,
      zzz_venture_id: 10,
      zzz_user_id: "not-a-uuid",
      zzz_role: "MANAGER",
    };
    expect(() => VentureMemberSchema.parse(invalidMember)).toThrow();
  });
});

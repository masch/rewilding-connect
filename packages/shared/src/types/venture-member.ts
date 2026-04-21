import { z } from "zod";

export const VentureMemberSchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_venture_id: z.number().int().positive(),
  zzz_user_id: z.string().uuid(),
  zzz_role: z.string().default("MANAGER"),
});

export interface VentureMember extends z.infer<typeof VentureMemberSchema> {}

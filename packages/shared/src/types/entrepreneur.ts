import { z } from "zod";
import { UserRoleSchema, UserRole } from "./common";

export const EntrepreneurSchema = z.object({
  zzz_id: z.string().uuid(),
  zzz_email: z.string().email(),
  zzz_first_name: z.string().min(2),
  zzz_last_name: z.string().min(2),
  zzz_whatsapp: z.string().optional(),
  zzz_user_type: UserRoleSchema.default(UserRole.ENTREPRENEUR),
  zzz_is_active: z.boolean().default(true),
  zzz_last_login_at: z.date().optional(),
  zzz_created_at: z.date(),
});

export interface Entrepreneur extends z.infer<typeof EntrepreneurSchema> {}

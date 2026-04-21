import { z } from "zod";
import { ServiceCategorySchema } from "./service-category";
import { VentureMemberSchema } from "./venture-member";

/**
 * VentureDbSchema
 * Pure database entity representation (Flat)
 * Mapped to 'ventures' table.
 */
export const VentureDbSchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_catalog_type_id: z.number().int().positive(),
  zzz_name: z.string().min(2),
  zzz_description: z.string().optional(),
  zzz_address: z.string(),
  zzz_latitude: z.number().min(-90).max(90),
  zzz_longitude: z.number().min(-180).max(180),
  zzz_image_url: z.string().url().optional(),
  zzz_role_type_id: z.number().int().positive(),
  zzz_cascade_order: z.number().int().nonnegative().default(1),
  zzz_max_capacity: z.number().int().positive(),
  zzz_is_paused: z.boolean().default(false),
  zzz_is_active: z.boolean().default(true),
});

/**
 * VentureSchema (Domain Aggregate)
 * Business entity that includes catalog type and members.
 */
export const VentureSchema = VentureDbSchema.extend({
  zzz_categories: z.array(ServiceCategorySchema).optional(),
  zzz_members: z.array(VentureMemberSchema).optional(),
});

export type VentureRow = z.infer<typeof VentureDbSchema>;
export interface Venture extends z.infer<typeof VentureSchema> {}

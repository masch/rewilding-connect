import { z } from "zod";

/**
 * VenturePausedItemSchema
 * Intermediate entity (junction table) to manage which catalog items
 * are currently unavailable for a specific venture.
 */
export const VenturePausedItemSchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_venture_id: z.number().int().positive(),
  zzz_catalog_item_id: z.number().int().positive(),
  zzz_paused_at: z.date().default(() => new Date()),
  zzz_reason: z.string().nullable().optional(),
});

export type VenturePausedItem = z.infer<typeof VenturePausedItemSchema>;

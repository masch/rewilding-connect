import { z } from "zod";
import { OfferStatusSchema, SkipReasonSchema } from "./common";
import { VentureSchema } from "./venture";

export const CascadeAssignmentSchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_order_id: z.number().int().positive(),
  // order is omitted to prevent circular dependency, can be added if really needed via z.lazy
  zzz_venture_id: z.number().int().positive(),
  zzz_venture: VentureSchema.optional(),
  zzz_attempt_number: z.number().int().positive(),
  zzz_offer_status: OfferStatusSchema.default("WAITING_FOR_RESPONSE"),
  zzz_skip_reason: SkipReasonSchema.nullable().optional(),
  zzz_offer_sent_at: z.date(),
  zzz_response_deadline: z.date(),
  zzz_resolved_at: z.date().nullable().optional(),
});

export interface CascadeAssignment extends z.infer<typeof CascadeAssignmentSchema> {}

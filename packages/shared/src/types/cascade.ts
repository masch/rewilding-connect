import { z } from "zod";
import { OfferStatusSchema, SkipReasonSchema } from "./common";
import { VentureSchema } from "./venture";

export const CascadeAssignmentSchema = z.object({
  id: z.number().int().positive(),
  order_id: z.number().int().positive(),
  // order is omitted to prevent circular dependency, can be added if really needed via z.lazy
  venture_id: z.number().int().positive(),
  venture: VentureSchema.optional(),
  attempt_number: z.number().int().positive(),
  offer_status: OfferStatusSchema.default("WAITING_FOR_RESPONSE"),
  skip_reason: SkipReasonSchema.nullable().optional(),
  offer_sent_at: z.date(),
  response_deadline: z.date(),
  resolved_at: z.date().nullable().optional()
});

export interface CascadeAssignment extends z.infer<typeof CascadeAssignmentSchema> {}

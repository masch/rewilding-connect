import { z } from "zod";

// Shared Enums from the spec
export const TimeOfDaySchema = z.enum(["BREAKFAST", "LUNCH", "SNACK", "DINNER"]);
export type TimeOfDay = z.infer<typeof TimeOfDaySchema>;

// Supported languages for the platform
export const LanguageSchema = z.enum(["es", "en", "pt"]);
export type Language = z.infer<typeof LanguageSchema>;

// Helper for i18n JSONB fields
export const I18nStringSchema = z.record(LanguageSchema, z.string());
export type I18nString = z.infer<typeof I18nStringSchema>;

// Shared Enums from the spec
export const UserRoleSchema = z.enum(["TOURIST", "ADMIN", "ENTREPRENEUR"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const OrderStatusSchema = z.enum([
  "SEARCHING", 
  "OFFER_PENDING", 
  "CONFIRMED", 
  "COMPLETED", 
  "NO_SHOW", 
  "CANCELLED", 
  "EXPIRED"
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const CancelReasonSchema = z.enum([
  "BY_TOURIST", 
  "BY_ENTREPRENEUR", 
  "NO_VENTURE_AVAILABLE", 
  "SYSTEM_ERROR"
]);
export type CancelReason = z.infer<typeof CancelReasonSchema>;

export const OfferStatusSchema = z.enum([
  "WAITING_FOR_RESPONSE", 
  "ACCEPTED", 
  "REJECTED", 
  "TIMEOUT", 
  "AUTO_REJECTED"
]);
export type OfferStatus = z.infer<typeof OfferStatusSchema>;

export const SkipReasonSchema = z.enum([
  "GENERAL_PAUSE", 
  "INDIVIDUAL_PAUSE", 
  "CAPACITY_EXCEEDED", 
  "CLOSED_THAT_DAY", 
  "OUTSIDE_OPENING_HOURS", 
  "VENTURE_INACTIVE", 
  "NOT_OFFERED"
]);
export type SkipReason = z.infer<typeof SkipReasonSchema>;

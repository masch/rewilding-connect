import { z } from "zod";

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

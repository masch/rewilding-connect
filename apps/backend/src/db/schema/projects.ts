import { pgTable, serial, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  default_language: varchar("default_language", { length: 10 }).notNull().default("es"),
  supported_languages: jsonb("supported_languages").$type<string[]>().notNull().default(["es"]),
  cascade_timeout_minutes: integer("cascade_timeout_minutes").notNull().default(30),
  max_cascade_attempts: integer("max_cascade_attempts").notNull().default(10),
  is_active: boolean("is_active").notNull().default(true),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

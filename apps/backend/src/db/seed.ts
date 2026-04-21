import { db } from "./index";
import { projects } from "./schema/projects";
import { sql } from "drizzle-orm";
import { MOCK_PROJECTS } from "@repo/shared";
import { logger } from "../services/logger.service";

async function seed() {
  logger.info("🌱 Seeding projects...");

  for (const project of MOCK_PROJECTS) {
    await db
      .insert(projects)
      .values({
        id: project.id,
        name: project.name,
        default_language: project.default_language,
        supported_languages: project.supported_languages,
        cascade_timeout_minutes: project.cascade_timeout_minutes,
        max_cascade_attempts: project.max_cascade_attempts,
        is_active: project.is_active,
      })
      .onConflictDoUpdate({
        target: projects.id,
        set: {
          name: project.name,
          default_language: project.default_language,
          supported_languages: project.supported_languages,
          cascade_timeout_minutes: project.cascade_timeout_minutes,
          max_cascade_attempts: project.max_cascade_attempts,
          is_active: project.is_active,
        },
      });
  }

  // Reset sequence to the max ID to avoid "duplicate key" errors on next inserts
  await db.execute(sql`SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects))`);

  logger.info("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  logger.error("❌ Seeding failed!", err);
  process.exit(1);
});

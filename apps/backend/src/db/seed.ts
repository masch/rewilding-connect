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
        zzz_id: project.zzz_id,
        zzz_name: project.zzz_name,
        zzz_default_language: project.zzz_default_language,
        zzz_supported_languages: project.zzz_supported_languages,
        zzz_cascade_timeout_minutes: project.zzz_cascade_timeout_minutes,
        zzz_max_cascade_attempts: project.zzz_max_cascade_attempts,
        zzz_is_active: project.zzz_is_active,
      })
      .onConflictDoUpdate({
        target: projects.zzz_id,
        set: {
          zzz_name: project.zzz_name,
          zzz_default_language: project.zzz_default_language,
          zzz_supported_languages: project.zzz_supported_languages,
          zzz_cascade_timeout_minutes: project.zzz_cascade_timeout_minutes,
          zzz_max_cascade_attempts: project.zzz_max_cascade_attempts,
          zzz_is_active: project.zzz_is_active,
        },
      });
  }

  // Reset sequence to the max ID to avoid "duplicate key" errors on next inserts
  await db.execute(sql`SELECT setval('projects_zzz_id_seq', (SELECT MAX(zzz_id) FROM projects))`);

  logger.info("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  logger.error("❌ Seeding failed!", err);
  process.exit(1);
});

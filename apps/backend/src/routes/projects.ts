import { Hono } from "hono";
import { db } from "../db";
import { projects } from "../db/schema/projects";
import { desc } from "drizzle-orm";

import { CreateProjectSchema } from "@repo/shared";
import { logger } from "../services/logger.service";

const router = new Hono();

router.get("/", async (c) => {
  const result = await db.select().from(projects).orderBy(desc(projects.is_active), projects.name);
  return c.json(result);
});

router.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validated = CreateProjectSchema.parse(body);

    const [newProject] = await db.insert(projects).values(validated).returning();

    return c.json(newProject, 201);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      logger.warn("Project validation failed", { error: error.message });
      return c.json({ error: "Validation failed", details: error }, 400);
    }
    logger.error("Error creating project", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default router;

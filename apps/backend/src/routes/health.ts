import { Hono } from "hono";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { logger } from "../services/logger.service";
import type { GitHubRun } from "@repo/shared";

const health = new Hono();

// Environment variables should be accessed dynamically to support testing and runtime changes
const getGitHubConfig = () => ({
  token: process.env.GITHUB_TOKEN,
  repo: process.env.GITHUB_REPO,
});

health.get("/", async (c) => {
  const start = Date.now();
  let dbStatus: "ok" | "error" = "ok";
  let dbLatency: number | null = null;

  try {
    await db.execute(sql`SELECT 1`);
    dbLatency = Date.now() - start;
  } catch (error) {
    logger.error("Database health check failed", error);
    dbStatus = "error";
  }

  let githubRuns: GitHubRun[] = [];
  const { repo: GITHUB_REPO, token: GITHUB_TOKEN } = getGitHubConfig();

  if (GITHUB_REPO) {
    try {
      const ghUrl = `https://api.github.com/repos/${GITHUB_REPO}/actions/runs?per_page=10`;
      const response = await fetch(ghUrl, {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : undefined,
      });
      if (response.ok) {
        const data = (await response.json()) as { workflow_runs?: GitHubRun[] };
        githubRuns = data.workflow_runs || [];
      }
    } catch (error) {
      logger.error("GitHub fetch failed in health check", error);
    }
  }

  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    database: {
      status: dbStatus,
      latency: dbLatency !== null ? `${dbLatency}ms` : "N/A",
    },
    github: {
      runs: githubRuns,
    },
  });
});

health.get("/check-runs/:ref", async (c) => {
  const ref = c.req.param("ref");
  const { repo: GITHUB_REPO, token: GITHUB_TOKEN } = getGitHubConfig();

  if (!GITHUB_REPO) return c.json({ annotations_count: 0, messages: [] }, 400);

  try {
    const ghUrl = `https://api.github.com/repos/${GITHUB_REPO}/commits/${ref}/check-runs`;
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : undefined;
    const response = await fetch(ghUrl, { headers });
    if (!response.ok) throw new Error(`GH API failed: ${response.status}`);

    const data = (await response.json()) as {
      check_runs?: Array<{
        name?: string;
        output?: {
          annotations_count?: number;
          annotations_url?: string;
          title?: string;
          summary?: string;
        };
      }>;
    };
    const checkRuns = data.check_runs || [];

    const annotations_count = checkRuns.reduce(
      (acc: number, run: { output?: { annotations_count?: number } }) =>
        acc + (run.output?.annotations_count || 0),
      0,
    );

    const messages: string[] = [];
    const seenMessages = new Set<string>();

    for (const run of checkRuns) {
      if ((run.output?.annotations_count || 0) > 0 && run.output?.annotations_url) {
        try {
          const annRes = await fetch(run.output.annotations_url, { headers });
          if (annRes.ok) {
            const annotations = (await annRes.json()) as Array<{ message?: string }>;
            if (Array.isArray(annotations)) {
              for (const a of annotations) {
                if (a.message && !seenMessages.has(a.message)) {
                  seenMessages.add(a.message);
                  messages.push(`[${run.name || "Check"}] ${a.message}`);
                }
              }
            }
          }
        } catch (e) {
          logger.error(`Failed to fetch annotations for ${run.name}`, e);
        }
      } else if (run.output?.title || run.output?.summary) {
        const msg = run.output?.title || run.output?.summary;
        if (msg && !seenMessages.has(msg)) {
          seenMessages.add(msg);
          messages.push(`[${run.name || "Check"}] ${msg}`);
        }
      }
    }

    return c.json({ annotations_count, messages: messages.slice(0, 3) });
  } catch (error) {
    logger.error("Failed to fetch annotations in backend", error);
    return c.json({ annotations_count: 0, messages: [] });
  }
});

export const healthRouter = health;

import { BackendHealth, GitHubRun } from "@repo/shared";
import env from "../config/env";
import { logger } from "./logger.service";

// GitHub logic moved to backend to protect tokens

// Check runs logic moved to backend proxy

export interface BackendHealthWithLatency extends BackendHealth {
  apiLatency: string;
}

interface StatusServiceInterface {
  fetchBackendHealth(): Promise<BackendHealthWithLatency>;
  fetchGitHubRuns(): Promise<GitHubRun[]>;
  fetchCheckRuns(ref: string): Promise<{ annotations_count: number; messages: string[] }>;
}

/**
 * MOCK Implementation
 */
export const MockStatusService: StatusServiceInterface = {
  fetchBackendHealth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: 1296000,
      environment: "mock",
      database: { status: "ok", latency: "0ms" },
      github: { runs: [] },
      apiLatency: "0ms",
    };
  },
  fetchGitHubRuns: async () => [],
  fetchCheckRuns: async () => ({ annotations_count: 0, messages: [] }),
};

/**
 * REST API Implementation
 */
export const RestStatusService: StatusServiceInterface = {
  fetchBackendHealth: async () => {
    const healthUrl = env.API_URL.replace("/v1", "/health");
    const start = performance.now();
    try {
      const response = await fetch(healthUrl);
      const end = performance.now();
      const apiLatency = `${Math.round(end - start)}ms`;
      if (!response.ok) throw new Error(`Health check failed: ${response.status}`);
      const data = await response.json();
      return { ...data, apiLatency };
    } catch (error) {
      logger.error("Health check failed", error);
      throw error;
    }
  },
  fetchGitHubRuns: async () => {
    const healthUrl = env.API_URL.replace("/v1", "/health");
    try {
      const response = await fetch(healthUrl);
      if (!response.ok) return [];
      const data = await response.json();
      return data.github?.runs || [];
    } catch (error) {
      logger.error("Failed to fetch runs from backend", error);
      return [];
    }
  },
  fetchCheckRuns: async (ref: string) => {
    const checkRunsUrl = env.API_URL.replace("/v1", `/health/check-runs/${ref}`);
    try {
      const response = await fetch(checkRunsUrl);
      if (!response.ok) return { annotations_count: 0, messages: [] };
      return await response.json();
    } catch (error) {
      logger.error("Failed to fetch check runs from backend", error);
      return { annotations_count: 0, messages: [] };
    }
  },
};

export const StatusService = env.USE_MOCKS ? MockStatusService : RestStatusService;

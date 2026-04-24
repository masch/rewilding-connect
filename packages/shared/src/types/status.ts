export interface BackendHealth {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
  environment: "production" | "staging" | "development" | "mock";
  database: {
    status: "ok" | "error";
    latency: string;
  };
  github: {
    runs: GitHubRun[];
  };
}

export interface GitHubRun {
  id: number;
  name: string;
  status: "completed" | "in_progress" | "queued";
  conclusion: "success" | "failure" | "cancelled" | "timed_out" | null;
  html_url: string;
  created_at: string;
  head_commit: {
    message: string;
    id: string;
  };
}

export interface SystemStatus {
  api: {
    status: "ok" | "error" | "loading";
    latency?: string;
  };
  database: {
    status: "ok" | "error" | "warning" | "loading";
    latency?: string;
  };
  ci: {
    status: "success" | "failure" | "in_progress" | "loading";
    message?: string;
  };
  deploy: {
    status: "success" | "failure" | "in_progress" | "loading";
    message?: string;
  };
}

import { GitHubRun } from "@repo/shared";

export const MOCK_GITHUB_RUNS: Omit<GitHubRun, "html_url">[] = [
  {
    id: 1,
    name: "CI",
    status: "completed",
    conclusion: "success",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    head_commit: {
      message: "FEAT(DB): MODERNIZE DATABASE LAYER AND DEPLOY TO NEON POSTGRES 17 (#134)",
      id: "7a1fb35",
    },
  },
  {
    id: 2,
    name: "Deploy Web",
    status: "completed",
    conclusion: "failure",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    head_commit: {
      message: "FIX(CI): REMOVE INVALID CACHE INPUT AND UPDATE EXPO EXPORT COMMAND",
      id: "33d0556",
    },
  },
];

export const MOCK_GITHUB_ANNOTATIONS: Record<
  string,
  { annotations_count: number; messages: string[] }
> = {
  "7a1fb35": {
    annotations_count: 3,
    messages: [
      "[build-and-deploy] Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, oven-sh/setup-bun@v1. Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026. Node.js 20 will be removed from the runner on September 16th, 2026. Please check if updated versions of these actions are available that support Node.js 24. To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file. Once Node.js 24 becomes the default, you can temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/",
      "[build-and-deploy] Process completed with exit code 2.",
    ],
  },
  "33d0556": {
    annotations_count: 1,
    messages: ["[build-and-deploy] Process completed with exit code 2."],
  },
};

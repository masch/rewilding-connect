import { Hono } from "hono";
import { healthRouter } from "./routes/health";
import { requestLogger } from "./middleware/logger";
import projectsRouter from "./routes/projects";

const app = new Hono();

app.use("*", requestLogger({ logBody: process.env.LOG_BODY === "true" }));

app.route("/health", healthRouter);
app.route("/v1/projects", projectsRouter);

export default app;

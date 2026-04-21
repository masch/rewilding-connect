import { describe, expect, it } from "bun:test";
import app from "../app";

describe("Projects API", () => {
  it("should return 200 OK and an array of projects", async () => {
    const res = await app.request("/v1/projects");

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);

    if (body.length > 0) {
      expect(body[0]).toHaveProperty("id");
      expect(body[0]).toHaveProperty("name");
      expect(body[0]).toHaveProperty("default_language");
    }
  });

  it("should create a new project and return 201 Created", async () => {
    const newProjectData = {
      name: "Test Project AI",
      default_language: "en",
      supported_languages: ["en", "es"],
      cascade_timeout_minutes: 45,
      max_cascade_attempts: 5,
      is_active: true,
    };

    const res = await app.request("/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProjectData),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty("id");
    expect(body.name).toBe(newProjectData.name);
  });

  it("should return 400 Bad Request when validation fails", async () => {
    const invalidData = {
      name: "A", // Too short (min 2)
      default_language: "it", // Not supported in LanguageSchema
    };

    const res = await app.request("/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidData),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
  });

  it("should return 400 when default_language is not in supported_languages", async () => {
    const inconsistentData = {
      name: "Inconsistent Project",
      default_language: "en",
      supported_languages: ["es"], // Missing 'en'
    };

    const res = await app.request("/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inconsistentData),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
  });
});

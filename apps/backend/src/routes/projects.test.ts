import { describe, expect, it } from "bun:test";
import app from "../app";

describe("Projects API", () => {
  it("should return 200 OK and an array of projects", async () => {
    const res = await app.request("/v1/projects");

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);

    if (body.length > 0) {
      expect(body[0]).toHaveProperty("zzz_id");
      expect(body[0]).toHaveProperty("zzz_name");
      expect(body[0]).toHaveProperty("zzz_default_language");
    }
  });

  it("should create a new project and return 201 Created", async () => {
    const newProjectData = {
      zzz_name: "Test Project AI",
      zzz_default_language: "en",
      zzz_supported_languages: ["en", "es"],
      zzz_cascade_timeout_minutes: 45,
      zzz_max_cascade_attempts: 5,
      zzz_is_active: true,
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
    expect(body).toHaveProperty("zzz_id");
    expect(body.zzz_name).toBe(newProjectData.zzz_name);
  });

  it("should return 400 Bad Request when validation fails", async () => {
    const invalidData = {
      zzz_name: "A", // Too short (min 2)
      zzz_default_language: "it", // Not supported in LanguageSchema
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
      zzz_name: "Inconsistent Project",
      zzz_default_language: "en",
      zzz_supported_languages: ["es"], // Missing 'en'
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

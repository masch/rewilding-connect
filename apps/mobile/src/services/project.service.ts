import { Project } from "@repo/shared";
import { MOCK_PROJECTS } from "../mocks/projects";

// EXPO_PUBLIC_ prefix makes vars available in the JS bundle at runtime
const USE_MOCKS = process.env.EXPO_PUBLIC_USE_MOCKS === "true";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Common interface for our service implementations.
 * This guarantees consistent contracts between mocks and real APIs.
 */
interface ProjectServiceInterface {
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | null>;
  saveProject(project: Partial<Project>): Promise<{ success: boolean }>;
}

/**
 * 🛠️ MOCK Implementation (Used during design/MVP phase)
 */
const MockProjectService: ProjectServiceInterface = {
  getProjects: async () => {
    await new Promise((r) => setTimeout(r, 800));
    return MOCK_PROJECTS;
  },
  getProjectById: async (id) => {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_PROJECTS.find((p) => p.id === id) || null;
  },
  saveProject: async (project) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("[MOCK API] Saving project:", project);
    return { success: true };
  },
};

/**
 * 📡 REST API Implementation (Future)
 */
const RestProjectService: ProjectServiceInterface = {
  getProjects: async () => {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error("API error fetching projects");
    return response.json();
  },
  getProjectById: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) throw new Error("API error fetching project by ID");
    return response.json();
  },
  saveProject: async (project) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    return { success: response.ok };
  },
};

/**
 * EXPORT: The smart switch
 */
export const ProjectService = USE_MOCKS ? MockProjectService : RestProjectService;

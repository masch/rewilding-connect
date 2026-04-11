import { z } from "zod";
import type { ZodIssue, ZodSchema } from "zod";
import {
  Project,
  CreateProjectSchema,
  CreateProjectInput,
  UpdateProjectSchema,
  UpdateProjectInput,
} from "@repo/shared";
import env from "../config/env";
import { MOCK_PROJECTS } from "../mocks/projects";
import { logger } from "./logger.service";

/**
 * Validate data using Zod schemas
 */
function validateData<S extends ZodSchema>(data: unknown, schema: S): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues
      .map((i: ZodIssue) => `${i.path.join(".")}: ${i.message}`)
      .join(", ");
    throw new Error(`Validation failed: ${errors}`);
  }
  return result.data;
}

/**
 * Common interface for our service implementations.
 * This guarantees consistent contracts between mocks and real APIs.
 */
interface ProjectServiceInterface {
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | null>;
  createProject(project: CreateProjectInput): Promise<Project>;
  updateProject(id: number, project: UpdateProjectInput): Promise<Project>;
  deleteProject(id: number): Promise<boolean>;
}

/**
 * 🛠️ MOCK Implementation (Used during design/MVP phase)
 */
const projectState = {
  projects: [...MOCK_PROJECTS],
  nextId: 3,
};

const MockProjectService: ProjectServiceInterface = {
  getProjects: async () => {
    await new Promise((r) => setTimeout(r, 800));
    return [...projectState.projects];
  },

  getProjectById: async (id: number) => {
    await new Promise((r) => setTimeout(r, 500));
    return projectState.projects.find((p) => p.id === id) || null;
  },

  createProject: async (project: CreateProjectInput) => {
    await new Promise((r) => setTimeout(r, 800));
    // Validate input using Zod
    const validated = validateData(project, CreateProjectSchema);
    const newProject: Project = {
      ...validated,
      id: projectState.nextId++,
    };
    projectState.projects = [...projectState.projects, newProject];
    logger.info("[MOCK API] Created project:", newProject);
    return newProject;
  },

  updateProject: async (id: number, project: UpdateProjectInput) => {
    await new Promise((r) => setTimeout(r, 800));
    const index = projectState.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    // Validate input using Zod
    const validated = validateData(project, UpdateProjectSchema);
    // Merge with existing - filter out undefined values
    const updatedProject = {
      ...projectState.projects[index],
      ...Object.fromEntries(Object.entries(validated).filter(([, v]) => v !== undefined)),
    };
    projectState.projects = projectState.projects.map((p) => (p.id === id ? updatedProject : p));
    logger.info("[MOCK API] Updated project:", updatedProject);
    return updatedProject;
  },

  deleteProject: async (id: number) => {
    await new Promise((r) => setTimeout(r, 800));
    const exists = projectState.projects.some((p) => p.id === id);
    if (!exists) {
      return false;
    }
    projectState.projects = projectState.projects.filter((p) => p.id !== id);
    logger.info(`[MOCK API] Deleted project with id: ${id}`);
    return true;
  },
};

/**
 * 📡 REST API Implementation (Future)
 */
const RestProjectService: ProjectServiceInterface = {
  getProjects: async () => {
    const response = await fetch(`${env.API_URL}/projects`);
    if (!response.ok) throw new Error("API error fetching projects");
    return response.json();
  },

  getProjectById: async (id: number) => {
    const response = await fetch(`${env.API_URL}/projects/${id}`);
    if (!response.ok) throw new Error("API error fetching project by ID");
    return response.json();
  },

  createProject: async (project: CreateProjectInput) => {
    const response = await fetch(`${env.API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("API error creating project");
    return response.json();
  },

  updateProject: async (id: number, project: UpdateProjectInput) => {
    const response = await fetch(`${env.API_URL}/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("API error updating project");
    return response.json();
  },

  deleteProject: async (id: number) => {
    const response = await fetch(`${env.API_URL}/projects/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },
};

/**
 * EXPORT: The smart switch
 */
export const ProjectService = env.USE_MOCKS ? MockProjectService : RestProjectService;

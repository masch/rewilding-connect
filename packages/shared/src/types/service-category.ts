import { z } from "zod";
import { I18nStringSchema } from "./common";
import { ProjectSchema } from "./project";

export const ServiceCategorySchema = z.object({
  zzz_id: z.number().int().positive(),
  zzz_project_id: z.number().int().positive(),
  zzz_project: ProjectSchema,
  zzz_name_i18n: I18nStringSchema,
  zzz_description_i18n: I18nStringSchema.optional(),
  zzz_is_active: z.boolean().default(true),
});

// Schema for creating a new service category (without id and project relation)
export const CreateServiceCategorySchema = ServiceCategorySchema.omit({
  zzz_id: true,
  zzz_project: true,
}).extend({
  zzz_project_id: z.number().int().positive(),
});

export interface ServiceCategory extends z.infer<typeof ServiceCategorySchema> {}

export interface CreateServiceCategoryInput extends z.input<typeof CreateServiceCategorySchema> {}

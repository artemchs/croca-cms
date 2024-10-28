import { z } from "zod";
import { createOneCategorySchema } from "./createOneCategory";
import { readOneCategorySchema } from "./readOneCategory";

export const updateOneCategory = z.object({
  ...readOneCategorySchema.shape,
  ...createOneCategorySchema.shape,
});

export type UpdateOneCategoryInput = z.infer<typeof updateOneCategory>;

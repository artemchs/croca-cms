import { z } from "zod";
import { readOneCategorySchema } from "./readOneCategory";
import { createOneCategorySchema } from "./createOneCategory";

export const updateOneCategory = z.object({
  ...readOneCategorySchema.shape,
  ...createOneCategorySchema.shape,
});

export type UpdateOneCategoryInput = z.infer<typeof updateOneCategory>;

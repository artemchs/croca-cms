import { z } from "zod";
import { readOneCategorySchema } from "./readOneCategory";

export const deleteOneCategory = z.object({
  ...readOneCategorySchema.shape,
});

export type DeleteOneCategoryInput = z.infer<typeof deleteOneCategory>;

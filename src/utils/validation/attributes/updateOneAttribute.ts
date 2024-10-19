import { z } from "zod";
import { readOneAttributeSchema } from "./readOneAttribute";
import { createOneAttributeSchema } from "./createOneAttribute";

export const updateOneAttributeSchema = z.object({
  ...readOneAttributeSchema.shape,
  ...createOneAttributeSchema.shape,
});

export type UpdateOneAttributeInput = z.infer<typeof updateOneAttributeSchema>;

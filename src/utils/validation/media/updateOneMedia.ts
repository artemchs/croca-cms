import { z } from "zod";
import { readOneMediaSchema } from "./readOneMedia";
import { createOneMediaSchema } from "./createOneMedia";

export const updateOneMediaSchema = z.object({
  ...readOneMediaSchema.shape,
  ...createOneMediaSchema.shape,
});

export type UpdateOneMediaInput = z.infer<typeof updateOneMediaSchema>;

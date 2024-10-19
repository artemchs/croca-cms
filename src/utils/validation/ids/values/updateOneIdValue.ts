import { z } from "zod";
import { readOneIdValueSchema } from "./readOneIdValue";
import { createOneIdValueSchema } from "./createOneIdValue";

export const updateOneIdValueSchema = z.object({
  ...readOneIdValueSchema.shape,
  ...createOneIdValueSchema.shape,
});

export type UpdateOneIdValueInput = z.infer<typeof updateOneIdValueSchema>;

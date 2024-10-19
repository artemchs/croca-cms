import { z } from "zod";
import { readOneIdSchema } from "./readOneId";
import { createOneIdSchema } from "./createOneId";

export const updateOneIdSchema = z.object({
  ...readOneIdSchema.shape,
  ...createOneIdSchema.shape,
});

export type UpdateOneIdInput = z.infer<typeof updateOneIdSchema>;

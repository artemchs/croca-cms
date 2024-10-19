import { z } from "zod";
import { readOneAttributeValueSchema } from "./readOneAttributeValue";
import { createOneAttributeValueSchema } from "./createOneAttributeValue";

export const updateOneAttributeValueSchema = z.object({
  ...readOneAttributeValueSchema.shape,
  ...createOneAttributeValueSchema.shape,
});

export type UpdateOneAttributeValueInput = z.infer<
  typeof updateOneAttributeValueSchema
>;

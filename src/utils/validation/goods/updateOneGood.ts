import { z } from "zod";
import { readOneGoodSchema } from "./readOneGood";
import { createOneAttributeSchema } from "../attributes/createOneAttribute";

export const updateOneGoodSchema = z.object({
  ...readOneGoodSchema.shape,
  ...createOneAttributeSchema.shape,
});

export type UpdateOneGoodInput = z.infer<typeof updateOneGoodSchema>;

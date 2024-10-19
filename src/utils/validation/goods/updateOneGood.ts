import { z } from "zod";
import { readOneGoodSchema } from "./readOneGood";
import { createOneGoodSchema } from "./createOneGood";

export const updateOneGoodSchema = z.object({
  ...readOneGoodSchema.shape,
  ...createOneGoodSchema.shape,
});

export type UpdateOneGoodInput = z.infer<typeof updateOneGoodSchema>;

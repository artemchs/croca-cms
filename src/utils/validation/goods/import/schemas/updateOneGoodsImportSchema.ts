import { z } from "zod";
import { readOneGoodsImportSchemaSchema } from "./readOneGoodsImportSchema";
import { createOneGoodsImportSchemaSchema } from "./createOneGoodsImportSchema";

export const updateOneGoodsImportSchemaSchema = z.object({
  ...readOneGoodsImportSchemaSchema.shape,
  ...createOneGoodsImportSchemaSchema.shape,
});

export type UpdateOneGoodsImportSchemaInput = z.infer<
  typeof updateOneGoodsImportSchemaSchema
>;

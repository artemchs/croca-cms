import { z } from "zod";

export const readOneGoodsImportSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneGoodsImportSchemaInput = z.infer<
  typeof readOneGoodsImportSchema
>;

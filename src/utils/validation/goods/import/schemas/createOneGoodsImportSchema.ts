import { z } from "zod";

export const createOneGoodsImportSchemaSchema = z.object({
  schema: z.object({
    name: z.string().min(1),
    sku: z.string().min(1),
    description: z.string().optional(),
    fullPrice: z.string().optional(),
    price: z.string().optional(),
    fixedDiscount: z.string().optional(),
    percentageDiscount: z.string().optional(),
    quantity: z.number().optional(),
    attributes: z
      .array(
        z.object({
          id: z.string().min(1),
          field: z.string().min(1),
        }),
      )
      .optional(),
    ids: z
      .array(
        z.object({
          id: z.string().min(1),
          field: z.string().min(1),
        }),
      )
      .optional(),
    mediaKeys: z
      .array(
        z.object({
          field: z.string().min(1),
          separator: z.string().min(1),
        }),
      )
      .optional(),
  }),
});

export type CreateOneGoodsImportSchemaInput = z.infer<
  typeof createOneGoodsImportSchemaSchema
>;

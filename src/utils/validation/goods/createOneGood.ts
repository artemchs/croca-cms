import { z } from "zod";
import { Decimal } from "decimal.js";

export const createOneGoodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  oldPrice: z.instanceof(Decimal).optional(),
  price: z.instanceof(Decimal).optional(),
  quantity: z.number().optional(),
  categoryId: z.string().optional(),
  attributeValueIds: z.array(z.string()).optional(),
  idValueIds: z.array(z.string()).optional(),
  mediaKeys: z.array(z.string()).optional(),
});

export type CreateOneGoodInput = z.infer<typeof createOneGoodSchema>;

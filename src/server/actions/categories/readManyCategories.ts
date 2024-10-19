import { z } from "zod";

export const readManyCategories = z.object({
  limit: z.number().int().positive().optional().default(10),
  offset: z.number().int().nonnegative().optional().default(0),
  search: z.string().optional(),
  filters: z
    .object({
      parentId: z.string().optional(),
    })
    .optional(),
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategories>;

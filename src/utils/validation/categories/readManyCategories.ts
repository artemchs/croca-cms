import { z } from "zod";

export const readManyCategories = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      parentId: z.string().optional(),
    })
    .optional(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategories>;

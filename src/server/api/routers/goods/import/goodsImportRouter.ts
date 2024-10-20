import { createTRPCRouter } from "@/server/api/trpc";
import { goodsImportSchemasRouter } from "./schemas/goodsImportSchemasRouter";

export const goodsImportRouter = createTRPCRouter({
  schemas: goodsImportSchemasRouter,
});

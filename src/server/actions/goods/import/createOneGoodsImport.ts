import { type PrismaTransaction } from "@/server/db";
import { type CreateOneGoodsImportInput } from "@/utils/validation/goods/import/createOneGoodsImport";
import { readOneGoodsImportSchema } from "./schemas/readOneGoodsImportSchema";
import { downloadObject } from "@/utils/storage/downloadObject";
import { transformExcelToJson } from "./utils/transformExcelToJson";
import { validateAndParseGoodsImportSchema } from "./utils/validateAndParseGoodsImportSchema";
import { mapJsonToGoods } from "./utils/mapJsonToGoods";
import { uploadMappedGoodsToDb } from "./utils/uploadMappedGoodsToDb";

export type GoodsImportJsonItem = Record<string, unknown>;

export const createOneGoodsImport = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodsImportInput;
}) => {
  let goodsImportId: string | null = null;

  try {
    const goodsImportSchema = await readOneGoodsImportSchema({
      tx,
      payload: { id: payload.schemaId },
    });

    const schemaData = validateAndParseGoodsImportSchema(goodsImportSchema);

    const goodsImportFile = await downloadObject({ Key: payload.fileKey });

    const goodsImport = await tx.goodsImport.create({
      data: {
        fileKey: payload.fileKey,
        schemaId: goodsImportSchema.id,
        status: "PROCESSING",
      },
    });
    goodsImportId = goodsImport.id;

    const json = transformExcelToJson(goodsImportFile) as GoodsImportJsonItem[];

    const mappedGoods = mapJsonToGoods(json, schemaData);

    await uploadMappedGoodsToDb({ tx, mappedGoods });

    await tx.goodsImport.update({
      where: {
        id: goodsImportId,
      },
      data: {
        status: "COMPLETED",
      },
    });
  } catch (error) {
    if (goodsImportId) {
      await tx.goodsImport.update({
        where: {
          id: goodsImportId,
        },
        data: {
          status: "FAILED",
          message: JSON.stringify(error, null, 2),
        },
      });
    }
    console.error(error);
    throw new Error("Failed to import goods");
  }
};

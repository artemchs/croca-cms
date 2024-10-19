import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { storage } from "../../server/storage";
import { env } from "@/env";

export const deleteObject = async (params: { Key: string }) => {
  try {
    const command = new DeleteObjectCommand({
      ...params,
      Bucket: env.S3_BUCKET,
    });

    await storage.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete object from S3");
  }
};

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { storage } from "../../server/storage";
import { env } from "@/env";

export const uploadObject = async (params: { Key: string; Body: Buffer }) => {
  try {
    const command = new PutObjectCommand({
      ...params,
      Bucket: env.S3_BUCKET,
    });

    await storage.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload object to S3");
  }
};

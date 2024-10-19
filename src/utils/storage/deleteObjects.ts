import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { storage } from "../../server/storage";
import { env } from "@/env";

export const deleteObjects = async (params: { Keys: string[] }) => {
  try {
    const command = new DeleteObjectsCommand({
      Bucket: env.S3_BUCKET,
      Delete: {
        Objects: params.Keys.map((Key) => ({ Key })),
        Quiet: false,
      },
    });

    await storage.send(command);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete objects from S3");
  }
};

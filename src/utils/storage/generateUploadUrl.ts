import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { storage } from "@/server/storage";

export const generateUploadUrl = async (params: { Key: string }) => {
  try {
    const command = new PutObjectCommand({
      ...params,
      Bucket: process.env.S3_BUCKET,
    });

    const url = await getSignedUrl(storage, command, { expiresIn: 3600 });

    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate upload URL");
  }
};

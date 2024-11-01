"use server";
import crypto from "crypto";
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { db } from "./db";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 1- S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGIONN!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  apiVersion: "2011-12-05",
  // signatureVersion: 'v4',
});

// util functions
export const createRandomImageKey = async (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

export const fileToBuffer = async (file: File): Promise<Buffer> => {
  return sharp(await file.arrayBuffer())
    .webp()
    .toBuffer();
};

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

// main functions
export const uploadImageAsThumbnailtoS3 = async (
  file: File
): Promise<string> => {
  const thumbnail = await sharp(await file.arrayBuffer())
    .webp()
    .resize(300, 300)
    .toBuffer();
  return uploadBufferToS3(thumbnail, "image/webp");
};

export const uploadImageToS3 = async (file: File): Promise<string> => {
  const buffer = await fileToBuffer(file);
  const imageUrl = await uploadBufferToS3(buffer, "image/webp");
  return imageUrl;
};

export const uploadAgencyLogo = async ({
  agencyId,
  checksum,
}: {
  agencyId: string;
  checksum: string;
}) => {
  // update workspace logo

  try {
    const agency = await db.agency.findUnique({
      where: {
        id: agencyId,
      },
    });
    const generatedKey = agency?.agencyLogo
      ? agency?.agencyLogo?.split("/").pop()
      : await createRandomImageKey();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAMEE!,
      Key: generatedKey,
      Metadata: {
        agencyId,
      },
      ChecksumSHA256: checksum,
    });
    const url = await getSignedUrl(
      s3Client,
      putObjectCommand,
      { expiresIn: 60 } // 60 seconds
    );
    await db.agency.update({
      where: {
        id: agencyId,
      },
      data: {
        agencyLogo: url.split("?")[0],
      },
    });

    return { url };
  } catch (error) {
    console.log({ error });
    return { error: "Failed to upload the logo" };
  }
};

export const uploadSubaccountLogo = async ({
  subaccountId,
  checksum,
}: {
  subaccountId: string;
  checksum: string;
}) => {
  // update workspace logo

  try {
    const subaccount = await db.subAccount.findUnique({
      where: {
        id: subaccountId,
      },
    });
    const generatedKey = subaccount?.subAccountLogo
      ? subaccount?.subAccountLogo?.split("/").pop()
      : await createRandomImageKey();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAMEE!,
      Key: generatedKey,
      Metadata: {
        subaccountId,
      },
      ChecksumSHA256: checksum,
    });
    const url = await getSignedUrl(
      s3Client,
      putObjectCommand,
      { expiresIn: 60 } // 60 seconds
    );
    await db.agency.update({
      where: {
        id: subaccountId,
      },
      data: {
        agencyLogo: url.split("?")[0],
      },
    });

    return { url };
  } catch (error) {
    console.log({ error });
    return { error: "Failed to upload the logo" };
  }
};

// main upload / delete functions
export const uploadBufferToS3 = async (
  buffer: Buffer,
  contentType: string,
  metadata?: object
): Promise<string> => {
  /** return image url including generated key of uploaded buffer */

  const generatedKey = await createRandomImageKey();
  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAMEE!,
    Key: generatedKey,
    Metadata: metadata as {},
    Body: buffer,
    ContentType: contentType,
    //   ChecksumSHA256: checksum,
  };

  const command = new PutObjectCommand(params);
  try {
    const data = await s3Client.send(command);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${generatedKey}`;
    return imageUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

export const deleteImageFromS3 = async (imageKey: string): Promise<boolean> => {
  // return false in case of failure

  const params: DeleteObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAMEE!,
    Key: imageKey,
  };

  const command = new DeleteObjectCommand(params);
  try {
    const data = await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return false;
  }
};

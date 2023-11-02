import {
  BlobSASPermissions,
  BlobServiceClient,
  BlockBlobUploadResponse,
} from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AzureStorageAccountFiles;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

export interface FileUploaded {
  name: string;
  url: string;
  mimeType: string;
  size: string;
}

export default async function uploadFileToBlob(
  name: string,
  mimeType: string,
  base64: string
): Promise<FileUploaded> {
  const containerName = "files";
  name = `${Date.now()}@${name}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const buffer = Buffer.from(base64.split(",")[1], "base64");

  const blockBlobClient = containerClient.getBlockBlobClient(name);
  await blockBlobClient.upload(buffer, Buffer.byteLength(base64), {
    blobHTTPHeaders: {
      blobContentType: mimeType,
    },
  });

  const fileUploaded: FileUploaded = {
    name,
    url: blockBlobClient.url,
    mimeType: mimeType,
    size: Buffer.byteLength(base64).toString(),
  };

  return fileUploaded;
}

export async function updateSas(file: FileUploaded) {
  const containerName = "files";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  const sas = await blockBlobClient.generateSasUrl({
    expiresOn: new Date(new Date().valueOf() + 86400),
    permissions: BlobSASPermissions.parse("r"),
  });
  file.url = sas;
  return file;
}

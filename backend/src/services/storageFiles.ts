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
  containerName: string;
}

export default async function uploadFileToBlob(
  containerName: string,
  name: string,
  mimeType: string,
  base64: string
): Promise<FileUploaded> {
  name = `${Date.now()}@${name}`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: "blob",
  });
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
    containerName,
  };

  return fileUploaded;
}

export async function updateSas(file: FileUploaded) {
  const containerClient = blobServiceClient.getContainerClient(
    file.containerName
  );
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  const sas = await blockBlobClient.generateSasUrl({
    expiresOn: new Date(new Date().valueOf() + 86400),
    permissions: BlobSASPermissions.parse("r"),
  });
  file.url = sas;
  return file;
}

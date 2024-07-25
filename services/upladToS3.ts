import { S3 } from 'aws-sdk';
import fs from 'fs';

export async function uploadToS3(filePath: string, bucketName: string, key: string) {
  const s3 = new S3();
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent,
  };

  await s3.upload(params).promise();
}

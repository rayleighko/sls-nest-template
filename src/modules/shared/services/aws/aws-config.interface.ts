import { PutObjectCommandInput, S3ClientConfig } from "@aws-sdk/client-s3";

export interface AwsConfig {
  clientParams: S3ClientConfig;
  putObjectCommand: PutObjectCommandInput;
}

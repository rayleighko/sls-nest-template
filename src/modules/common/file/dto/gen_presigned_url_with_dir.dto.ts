import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { ImageFileTypeUnion } from "~/common/constant";
import { ImageFileType } from "~/common/constant/image_file_type";
import { S3ImageAsset } from "~/common/constant/s3_image_asset";

export class GenPresignedUrlWithDirDto {
  @IsEnum(ImageFileType.enum)
  @IsNotEmpty()
  extention: ImageFileTypeUnion;

  @IsNotEmpty()
  dir: S3ImageAsset;

  @IsString()
  @IsNotEmpty()
  userUlid: string;
}

import { IsEnum, IsNotEmpty } from "class-validator";

import { ImageFileTypeUnion } from "~/common/constant";
import { ImageFileType } from "~/common/constant/image_file_type";

export class GenPresignedUrlDto {
  @IsEnum(ImageFileType.enum)
  @IsNotEmpty()
  extention: ImageFileTypeUnion;
}

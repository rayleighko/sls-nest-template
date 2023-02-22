import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import { FileNotFoundException } from "~/exceptions/file-not-found.exception";
import { UserService } from "~/modules/core/user/service/user.service";
import { ConfigService } from "~/modules/shared/services/config.service";
import { ValidatorService } from "~/modules/shared/services/validator.service";
import { getS3Dir } from "~/utils/aws";

import { GenPresignedUrlWithDirDto } from "./dto/gen_presigned_url_with_dir.dto";
import { PresignedUrlDto } from "./dto/presigned_url.dto";
import { File } from "./file.interface";

@Injectable()
export class FileService {
  s3Client: S3Client;
  constructor(
    private readonly cfg: ConfigService,
    private readonly validatorService: ValidatorService,
    private readonly userService: UserService
  ) {
    this.s3Client = new S3Client(this.cfg.aws.clientParams);
  }

  readonly generatePresignedUrl = async (
    d: GenPresignedUrlWithDirDto
  ): Promise<PresignedUrlDto> => {
    const fileName = `${d.userUlid}.${d.extention}`;
    const s3Dir = getS3Dir(d.dir);

    const command = new PutObjectCommand({
      ...this.cfg.aws.putObjectCommand,
      Key: `${s3Dir}/${fileName}`,
      ContentType: `image/${d.extention}`
    });
    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 3600
    });
    // filePath = `https://${this.cfg.aws.putObjectCommand.Bucket}.s3.${this.cfg.aws.clientParams.region}.amazonaws.com/${s3Dir}/${fileName}`

    return {
      url // presigned url
    };
  };

  // util
  verifyFile(file: File): void {
    if (!file) {
      throw new FileNotFoundException();
    }
  }
  verifyImageFile(file: File): boolean {
    return this.validatorService.isImage(file.mimetype);
  }
}

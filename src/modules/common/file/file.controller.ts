import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { S3Client } from "@aws-sdk/client-s3";

import { JwtAuthGuard } from "~/guards/jwt-auth.guard";
import { ConfigService } from "~/modules/shared/services/config.service";
import { AuthUserInterceptor } from "~/interceptors/auth-user.interceptor";

import { FileService } from "./file.service";
import { PresignedUrlDto } from "./dto/presigned_url.dto";
import { GenPresignedUrlDto } from "./dto/gen_presigned_url.dto";

@Controller("file")
@UseGuards(JwtAuthGuard)
export class FileController {
  private s3Client: S3Client;
  constructor(
    private readonly cfg: ConfigService,
    private readonly service: FileService,
    private readonly i18n?: I18nService
  ) {
    this.s3Client = new S3Client(this.cfg.aws.clientParams);
  }

  @Post("/signed/file/:ulid")
  @UseInterceptors(AuthUserInterceptor)
  private async generatePresignedUrlWithSelfy(
    @Param("ulid") userUlid: string,
    @Body() { extention }: GenPresignedUrlDto
  ): Promise<PresignedUrlDto> {
    return this.service.generatePresignedUrl({
      userUlid,
      extention,
      dir: "file"
    });
  }
}

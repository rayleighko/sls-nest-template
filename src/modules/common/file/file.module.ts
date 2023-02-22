import { Module } from "@nestjs/common";

import { UserModule } from "~/modules/core/user/user.module";
import { UserProfileModule } from "~/modules/core/user_profile/user_profile.module";

import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
  imports: [UserModule, UserProfileModule],
  controllers: [FileController],
  exports: [FileService],
  providers: [FileService]
})
export class FileModule {}

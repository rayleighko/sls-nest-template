import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "~/modules/core/user/user.module";

import { AuthController } from "./auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

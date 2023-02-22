import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { ConfigService } from "./services/config.service";
import { GeneratorService } from "./services/generator.service";
import { ValidatorService } from "./services/validator.service";

const providers = [ConfigService, ValidatorService, GeneratorService];

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (cfg: ConfigService) => ({
        timeout: cfg.getNumber("HTTP_TIMEOUT"),
        maxRedirects: cfg.getNumber("HTTP_MAX_REDIRECTS")
      }),
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get("JWT_ACCESS_TOKEN_SECRET"),
        signOptions: {
          expiresIn: cfg.getNumber("JWT_ACCESS_TOKEN_EXPIRATION_TIME")
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers,
  exports: [...providers, HttpModule, JwtModule]
})
export class SharedModule {}

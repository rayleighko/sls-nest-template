import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SentryModule } from "@ntegral/nestjs-sentry";

import { ConfigService } from "~/modules/shared/services/config.service";
import { SharedModule } from "~/modules/shared/shared.module";

export const ThirdPartyModules = [
  TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    useFactory: (cfg: ConfigService) => cfg.typeOrmConfig,
    inject: [ConfigService]
  }),
  SentryModule.forRootAsync({
    useFactory: async (cfg: ConfigService) => ({
      dsn: cfg.get("SENTRY_DSN"),
      debug: cfg.isDevelopment,
      environment: cfg.nodeEnv,
      release: cfg.get("RELEASE"),
      logLevel: 0,
      tracesSampleRate: 1.0
    }),
    imports: [SharedModule],
    inject: [ConfigService]
  }),
  TerminusModule
];

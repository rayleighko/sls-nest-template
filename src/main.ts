import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";
import { NestExpressApplication } from "@nestjs/platform-express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { QueryFailedFilter } from "./filters/query-failed.filter";
import { AllExceptionsFilter } from "./filters/all-exception.filter";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigService } from "./modules/shared/services/config.service";

// const corsWhiteList = ["http://localhost"];

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors({
  //   origin: corsWhiteList,
  //   credentials: true
  // });

  app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

  await app.init();

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 3 * 60 * 1000, // 3 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );
  app.use(compression());
  app.use(morgan("combined"));

  const { httpAdapter } = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter),
    new QueryFailedFilter(reflector)
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false
      }
    })
  );

  const cfg = app.select(SharedModule).get(ConfigService);

  const { stage } = cfg;

  const introDesc = `server running on ${stage}`;

  console.info(
    `
      ${introDesc}
      `
  );

  await app.listen(3000);
}

bootstrap();

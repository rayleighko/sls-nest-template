import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";
import {
  ExpressAdapter,
  NestExpressApplication
} from "@nestjs/platform-express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import express from "express";

import { AppModule } from "./app.module";
import { QueryFailedFilter } from "./filters/query-failed.filter";
import { AllExceptionsFilter } from "./filters/all-exception.filter";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigService } from "./modules/shared/services/config.service";

// const corsWhiteList = ["http://localhost"];
let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  if (!cachedServer) {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp)
    );

    // nestApp.enableCors({
    //   origin: corsWhiteList,
    //   credentials: true
    // });

    nestApp.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

    await nestApp.init();

    nestApp.use(helmet());
    nestApp.use(
      rateLimit({
        windowMs: 3 * 60 * 1000, // 3 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      })
    );
    nestApp.use(compression());
    nestApp.use(morgan("combined"));

    const { httpAdapter } = nestApp.get(HttpAdapterHost);
    const reflector = nestApp.get(Reflector);

    nestApp.useGlobalFilters(
      new AllExceptionsFilter(httpAdapter),
      new QueryFailedFilter(reflector)
    );

    nestApp.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: {
          target: false
        }
      })
    );

    const cfg = nestApp.select(SharedModule).get(ConfigService);

    const { stage } = cfg;

    const introDesc = `server running on ${stage}`;

    console.info(
      `
        ${introDesc}
        `
    );

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

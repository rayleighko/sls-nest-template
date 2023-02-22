import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // private logger = new Logger("HTTP");
  // private sentry = new SentryService();
  // private cfg = new ConfigService();

  use(request: Request, response: Response, next: NextFunction): void {
    response.on("close", () => {
      try {
        // if (this.cfg.isDevelopment) {
        //   this.logger.log("logger middleware");
        // }
      } catch (e) {
        // this.logger.error(JSON.stringify(e));
      }
      // this.sentry.log("test-logger");
    });

    next();
  }
}

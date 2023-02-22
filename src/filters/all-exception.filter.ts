import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { SentryService } from "@ntegral/nestjs-sentry";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private sentry = new SentryService();

  catch(
    exception: {
      response: { statusCode: number; message: string; error: string };
      status: number;
      message: string;
    },
    host: ArgumentsHost
  ): void {
    super.catch(exception, host);
    if (exception.status === 500) {
      this.sentry.debug(`${exception.status}: ${exception.message}`);
    }
  }
}

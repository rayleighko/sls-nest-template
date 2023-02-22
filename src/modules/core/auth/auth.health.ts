import { Injectable } from "@nestjs/common";
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult
} from "@nestjs/terminus";

@Injectable()
export class AuthHealthIndicator extends HealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus(key, isHealthy, {});

    if (!isHealthy) {
      throw new HealthCheckError("Auth Check failed", result);
    }

    return result;
  }
}

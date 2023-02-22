import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator
} from "@nestjs/terminus";

@Controller("/")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get()
  public getHealthcheckPublic() {
    return "OK";
  }

  @Get("health")
  @HealthCheck()
  public check() {
    return this.health.check([
      // default
      () => this.db.pingCheck("database")
      // () =>
      //   this.disk.checkStorage("storage", { path: "/", thresholdPercent: 0.5 })
      // () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024)
      // () => this.memory.checkRSS("memory_rss", 150 * 1024 * 1024)
    ]);
  }
}

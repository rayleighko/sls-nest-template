import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
import _ from "lodash";
import os from "os";

import { AwsConfig } from "~/modules/shared/services/aws/aws-config.interface";
import { SnakeNamingStrategy } from "~/snake-naming.strategy";

import { UserSubscriber } from "../entity-subscribers/user-subscriber";

export class ConfigService {
  constructor() {
    dotenv.config();

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, "\n");
    }
  }

  get isLocal(): boolean {
    return os.hostname().includes("local");
  }

  get stage(): string {
    return this.get("STAGE");
  }

  get isTest(): boolean {
    return this.nodeEnv === "test";
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get("NODE_ENV");
  }

  get fallbackLanguage(): string {
    return _.lowerCase(this.get("FALLBACK_LANGUAGE"));
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + "../../../**/*.entity{.ts,.js}"];
    let migrations = [__dirname + "../../../**/*.migration{.ts,.js}"];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        "./../../../modules",
        true,
        /\.entity\.ts$/
      );
      entities = entityContext.keys().map(id => {
        const entityModule: typeof Object = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (<any>require).context(
        "./../../../migrations",
        false,
        /\.migration\.ts$/
      );
      migrations = migrationContext.keys().map(id => {
        const migrationModule: typeof Object = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: "postgres",
      host: this.get("SQL_DB_HOST"),
      port: this.getNumber("SQL_DB_PORT"),
      username: this.get("SQL_DB_USERNAME"),
      password: this.get("SQL_DB_PASSWORD"),
      database: this.get("SQL_DB_DATABASE"),
      synchronize: this.isDevelopment,
      migrationsRun: false,
      logging: this.isDevelopment,
      subscribers: [UserSubscriber],
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        connectionLimit: 20
      }
    };
  }

  get aws(): AwsConfig {
    return {
      clientParams: {
        region: "ap-northeast-2",
        credentials: {
          accessKeyId: this.get("AWS_S3_ACCESS_KEY"),
          secretAccessKey: this.get("AWS_S3_SECRET_ACCESS_KEY")
        }
      },
      putObjectCommand: {
        Bucket: this.get("AWS_S3_USER_IMAGE_BUCKET_NAME"),
        Key: ""
      }
    };
  }
}

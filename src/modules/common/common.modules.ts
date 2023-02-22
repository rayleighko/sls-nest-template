import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import path from "path";

import { FileModule } from "./file/file.module";
import { HealthModule } from "./health/health.module";
import { ThirdPartyModules } from "./third_party/third_party.modules";

const DefaultModules = [
  FileModule,
  HealthModule,
  I18nModule.forRoot({
    fallbackLanguage: "en",
    loaderOptions: {
      path: path.join(`${__dirname}/../../`, "i18n/"),
      watch: true
    },
    resolvers: [
      { use: QueryResolver, options: ["lang"] },
      AcceptLanguageResolver
    ]
  })
];

export const CommonModules = DefaultModules.concat(ThirdPartyModules);

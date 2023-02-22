import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

import { OrderUnion } from "~/common/constant";

export class PageOptionsDto {
  @IsOptional()
  order?: OrderUnion = "ASC";

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsString()
  @IsOptional()
  q?: string;
}

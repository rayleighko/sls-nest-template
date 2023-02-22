import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { toInt } from "~/decorators/transforms.decorator";

export class AbstractSearchDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsNumber()
  @IsNotEmpty()
  @toInt()
  page: number;

  @IsNumber()
  @IsOptional()
  @toInt()
  take = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

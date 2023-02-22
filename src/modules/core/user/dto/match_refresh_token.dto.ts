import { IsString } from "class-validator";

export class MatchRefreshTokenDto {
  @IsString()
  ulid: string;

  @IsString()
  refresh: string;
}

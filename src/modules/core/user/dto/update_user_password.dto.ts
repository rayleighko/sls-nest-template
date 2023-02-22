import { IsString } from "class-validator";

export class UpdateUserPasswordDto {
  @IsString()
  ulid: string;

  @IsString()
  password: string;
}

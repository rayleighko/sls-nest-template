import { IsString } from "class-validator";

import { UserDto } from "./user.dto";

export class UpdateUserDto {
  @IsString()
  ulid: string;

  user: Partial<UserDto>;
}

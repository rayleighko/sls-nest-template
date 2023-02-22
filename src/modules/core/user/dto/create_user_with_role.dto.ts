import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

import { Role, RoleUnion } from "~/common/constant";

export class CreateUserWithRoleDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @IsEnum(Role.enum)
  @IsNotEmpty()
  role: RoleUnion;
}

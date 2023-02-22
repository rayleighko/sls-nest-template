import { RoleUnion } from "~/common/constant";
import { AbstractDto } from "~/common/dto/Abstract.dto";

import { UserEntity } from "../user.entity";

export class UserDto extends AbstractDto {
  username: string;
  refresh: string;
  isActive: boolean;
  role: RoleUnion;

  constructor(e: UserEntity) {
    super(e);
    this.username = e.username;
    this.refresh = e.refresh;
    this.role = e.role;
    this.isActive = e.isActive;
  }
}

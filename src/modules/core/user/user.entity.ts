import { Column, Entity } from "typeorm";

import { AbstractEntity } from "~/common/abstract.entity";
import { RoleUnion } from "~/common/constant";

import { userColumnOptions } from "./constant/typeorm";
import { UserDto } from "./dto/user.dto";

@Entity({ name: "user" })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column(userColumnOptions.username)
  username: string;
  @Column(userColumnOptions.role)
  role: RoleUnion;
  @Column(userColumnOptions.salt)
  salt: string;
  @Column(userColumnOptions.oldSalt)
  oldSalt: string;
  @Column(userColumnOptions.refresh)
  refresh: string;
  @Column(userColumnOptions.isActive)
  isActive: boolean;

  dtoClass = UserDto;
}

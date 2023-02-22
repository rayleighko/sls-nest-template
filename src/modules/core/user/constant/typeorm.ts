import { Table, TableOptions } from "typeorm";

import { Role } from "~/common/constant";
import { commonTableColumnOptions } from "~/common/constant/typeorm";

import { UserColumnOptions, UserTableColumnOptions } from "../type/typeorm";

// for entity
export const userColumnOptions: UserColumnOptions = {
  username: {
    name: "username",
    type: "varchar",
    nullable: false,
    unique: true
  },
  salt: { name: "salt", type: "varchar", nullable: false },
  oldSalt: { name: "old_salt", type: "varchar", nullable: true },
  refresh: { name: "refresh", type: "varchar", nullable: true },
  role: {
    name: "role",
    type: "enum",
    enum: Role.tuple,
    default: "USER",
    nullable: false,
    enumName: "role"
  },
  isActive: {
    name: "is_active",
    type: "boolean",
    nullable: false,
    default: true
  }
};

// for migration
export const userTableColumnOptions: UserTableColumnOptions = {
  username: {
    name: "username",
    type: "varchar",
    isNullable: false,
    isUnique: true
  },
  salt: { name: "salt", type: "varchar", isNullable: false },
  oldSalt: { name: "old_salt", type: "varchar", isNullable: true },
  refresh: { name: "refresh", type: "varchar", isNullable: false },
  role: {
    name: "role",
    type: "enum",
    enum: [...Role.tuple],
    default: Role.enum.USER,
    isNullable: false,
    enumName: "role"
  },
  isActive: {
    name: "is_active",
    type: "boolean",
    isNullable: false,
    default: true
  }
};
const userTableOptions: TableOptions = {
  name: "user",
  columns: [
    commonTableColumnOptions.id,
    commonTableColumnOptions.ulid,
    userTableColumnOptions.username,
    userTableColumnOptions.salt,
    userTableColumnOptions.oldSalt,
    userTableColumnOptions.refresh,
    userTableColumnOptions.role,
    userTableColumnOptions.isActive,
    commonTableColumnOptions.createdAt,
    commonTableColumnOptions.updatedAt
  ]
};
export const UserTable = new Table(userTableOptions);

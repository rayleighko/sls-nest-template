import { CustomDecorator, SetMetadata } from "@nestjs/common";

import { RoleUnion } from "~/common/constant";

export const Roles = (...roles: RoleUnion[]): CustomDecorator<string> =>
  SetMetadata("roles", roles);

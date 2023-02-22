import { RoleUnion } from "~/common/constant";
import { PageOptionsDto } from "~/common/dto/PageOptions.dto";

export class UserPageOptionsWithRolesDto extends PageOptionsDto {
  roles: RoleUnion[];
}

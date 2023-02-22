import { AbstractRepository } from "~/common/abstract.repository";
import { PageDto } from "~/common/dto/Page.dto";
import { CustomRepository } from "~/decorators/typeorm-ex.decorator.ts";
import { UserNotFoundException } from "~/exceptions/user-not-found.exception";

import { UserDto } from "./dto/user.dto";
import { UserPageOptionsWithRolesDto } from "./dto/user_page_options_with_roles.dto";
import { UserEntity } from "./user.entity";

@CustomRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity, UserDto> {
  async findOneByUserName(username: string): Promise<UserEntity> {
    const user = await this.findOne({
      where: { username }
    });

    if (user) return user;

    throw new UserNotFoundException();
  }

  async paginateAllWithRoles(
    tbl: "user",
    o: UserPageOptionsWithRolesDto
  ): Promise<PageDto<UserDto>> {
    const queryBuilder = this.createQueryBuilder(tbl).skip(o.skip).take(o.take);

    if (o.roles) {
      queryBuilder.orWhere("role = :role", {
        role: o.roles[0]
      });
    }

    return this.paginate(queryBuilder, o);
  }
}

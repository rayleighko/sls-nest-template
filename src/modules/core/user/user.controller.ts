import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { DeleteResult, UpdateResult } from "typeorm";

import { PageDto } from "~/common/dto/Page.dto";
import { PageOptionsDto } from "~/common/dto/PageOptions.dto";
import { Roles } from "~/decorators/roles.decorator";
import { JwtAuthGuard } from "~/guards/jwt-auth.guard";
import { RolesGuard } from "~/guards/roles.guard";
import { AuthUserInterceptor } from "~/interceptors/auth-user.interceptor";

import { CreateUserWithRoleDto } from "./dto/create_user_with_role.dto";
import { UpdateUserPasswordDto } from "./dto/update_user_password.dto";
import { UserDto } from "./dto/user.dto";
import { UserDetailDto } from "./dto/user_detail.dto";
import { UserService } from "./service/user.service";

@Controller("user")
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly i18n: I18nService
  ) {}

  @Post("role")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async CreateUserWithRole(@Body() b: CreateUserWithRoleDto) {
    return this.service.createWithRole(b);
  }

  @Get()
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async paginateAllOnlyUser(
    @Query(new ValidationPipe({ transform: true }))
    q: PageOptionsDto
  ): Promise<PageDto<UserDto>> {
    return this.service.paginateAllWithRoles({
      ...q,
      skip: q.take * (q.page - 1),
      roles: ["USER"]
    });
  }

  @Get("admin/root")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async paginateAllAdmin(
    @Query(new ValidationPipe({ transform: true }))
    q: PageOptionsDto
  ): Promise<PageDto<UserDto>> {
    return this.service.paginateAllWithRoles({
      ...q,
      skip: q.take * (q.page - 1),
      roles: ["ROOT"]
    });
  }

  @Get(":ulid")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("ulid") ulid: string): Promise<UserDetailDto> {
    return this.service.findOneWithDetail(ulid);
  }

  @Put(":ulid")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Param("ulid") ulid: string,
    @Body() user: Partial<UserDto>
  ): Promise<UpdateResult> {
    return this.service.update({ ulid, user });
  }

  @Delete(":ulid")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param("ulid") ulid: string): Promise<DeleteResult> {
    return this.service.delete(ulid);
  }

  // util
  @Post("pw")
  @Roles("ROOT", "ADMIN", "ADMIN1", "ADMIN2", "ADMIN3", "ADMIN4", "ADMIN5")
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() b: UpdateUserPasswordDto): Promise<UpdateResult> {
    return this.service.resetPassword(b);
  }
}

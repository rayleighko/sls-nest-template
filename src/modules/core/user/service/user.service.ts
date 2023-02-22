import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { compareSync } from "bcryptjs";

import { PageOptionsDto } from "~/common/dto/PageOptions.dto";
import { UserNotFoundException } from "~/exceptions/user-not-found.exception";
import { ValidatorService } from "~/modules/shared/services/validator.service";

import { CreateUserDto } from "../dto/create_user.dto";
import { UserRepository } from "../user.repository";
import { IUserService } from "./user.service.interface";
import { UpdateUserDto } from "../dto/update_user.dto";
import { MatchRefreshTokenDto } from "../dto/match_refresh_token.dto";
import { CreateUserWithRoleDto } from "../dto/create_user_with_role.dto";
import { UserPageOptionsWithRolesDto } from "../dto/user_page_options_with_roles.dto";
import { UpdateUserPasswordDto } from "../dto/update_user_password.dto";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly validatorService: ValidatorService
  ) {}

  readonly create = async (d: CreateUserDto) => {
    const { username, password: salt } = d;
    await this.verifyUsername(username);
    const e = await this.repository.createOne({
      username,
      salt
    });

    return e.toDto();
  };
  readonly createWithRole = async (d: CreateUserWithRoleDto) => {
    const { username, password: salt, role } = d;
    await this.verifyUsername(username);
    const e = await this.repository.createOne({
      username,
      role,
      salt
    });

    return e.toDto();
  };
  readonly findOne = async (ulid: string) => {
    const e = await this.repository.findOne({
      where: {
        ulid
      }
    });

    if (!e) {
      throw new UserNotFoundException();
    }

    return e.toDto();
  };
  readonly findOneById = async (id: number) => {
    const e = await this.repository.findOne({
      where: {
        id
      }
    });

    if (!e) {
      throw new UserNotFoundException();
    }

    return e && e.toDto();
  };
  readonly findOneWithDetail = async (ulid: string) => {
    const user = await this.findOne(ulid);
    if (!user) {
      throw new UserNotFoundException();
    }

    return { user };
  };
  readonly paginateAll = async (o: PageOptionsDto) =>
    this.repository.paginateAll("user", o);
  readonly paginateAllWithRoles = async (o: UserPageOptionsWithRolesDto) =>
    this.repository.paginateAllWithRoles("user", o);
  readonly update = async ({ ulid, user }: UpdateUserDto) => {
    const result = await this.repository.updateOne({ ulid }, user);

    if (!result) {
      throw new UserNotFoundException();
    }

    return result;
  };
  readonly resetPassword = async ({
    ulid,
    password: salt
  }: UpdateUserPasswordDto) => {
    const finded = await this.repository.findOne({
      where: { ulid }
    });

    if (!finded) {
      throw new UserNotFoundException();
    }

    const result = await this.repository.updateOne(
      { ulid },
      {
        oldSalt: finded.salt,
        salt
      }
    );

    return result;
  };
  readonly delete = async (ulid: string) => {
    const result = await this.repository.deleteOne({
      ulid
    });

    if (!result) {
      throw new UserNotFoundException();
    }
    return result;
  };

  // util
  readonly verifyUsername = async (username: string) => {
    const e = await this.repository.findOne({ where: { username } });

    if (e) {
      throw new ConflictException("username already exists!");
    }

    return e;
  };
  readonly matchRefreshToken = async ({
    ulid,
    refresh
  }: MatchRefreshTokenDto) => {
    const d = await this.findOne(ulid);

    const isMatched = compareSync(refresh, d.refresh);

    if (!isMatched) {
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    return d;
  };
}

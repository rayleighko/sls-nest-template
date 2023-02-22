import { DeleteResult, UpdateResult } from "typeorm";

import { PageDto } from "~/common/dto/Page.dto";

import { UserDto } from "../dto/user.dto";
import { UserPageOptionsDto } from "../dto/user_page_options.dto";
import { CreateUserDto } from "../dto/create_user.dto";
import { UpdateUserDto } from "../dto/update_user.dto";
import { MatchRefreshTokenDto } from "../dto/match_refresh_token.dto";
import { UserDetailDto } from "../dto/user_detail.dto";
import { UserEntity } from "../user.entity";

// client <-> controller

export type CreateUser = (dto: CreateUserDto) => Promise<UserDto>;
export type FindOneUser = (ulid: string) => Promise<UserDto>;
export type FindOneById = (id: number) => Promise<UserDto>;
export type FindOneWithDetail = (ulid: string) => Promise<UserDetailDto>;
export type PaginateAllUser = (
  dto: UserPageOptionsDto
) => Promise<PageDto<UserDto>>;
export type UpdateUser = (dto: UpdateUserDto) => Promise<UpdateResult>;
export type DeleteUser = (ulid: string) => Promise<DeleteResult>;
export type VerifyUsername = (username: string) => Promise<UserEntity>;
export type MatchRefreshToken = (dto: MatchRefreshTokenDto) => Promise<UserDto>;

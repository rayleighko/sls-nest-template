import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";

import { AuthUser } from "~/decorators/auth-user.decorator";
import { JwtAuthGuard } from "~/guards/jwt-auth.guard";
import { AuthUserInterceptor } from "~/interceptors/auth-user.interceptor";

import { AuthService } from "./service/auth.service";
import { RefreshTokenDto } from "./dto/refresh_token.dto";
import { SignInDto } from "./dto/signin.dto";
import { SignUpDto } from "./dto/signup.dto";
import { UserDetailDto } from "../user/dto/user_detail.dto";
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  private async signIn(@Body() b: SignInDto) {
    return this.service.signIn(b);
  }

  @Post("signup")
  @HttpCode(HttpStatus.OK)
  private async signUp(@Body() b: SignUpDto) {
    return this.service.signUp(b);
  }

  @Post("signout")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  private async signOut(@AuthUser() { user }: UserDetailDto) {
    return this.service.signOut(user.ulid);
  }

  @Get("check/token")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  private async checkToken(@AuthUser() user: UserDetailDto) {
    return user;
  }

  @Get("me")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  private async getCurrentUser(@AuthUser() user: UserDetailDto) {
    return user;
  }

  @Post("refresh/token/:ulid")
  @HttpCode(HttpStatus.OK)
  private async refreshToken(
    @Param("ulid") ulid: string,
    @Body() b: RefreshTokenDto
  ) {
    return this.service.refreshToken(ulid, b.refreshToken);
  }
}

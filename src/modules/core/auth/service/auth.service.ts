import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { hashSync } from "bcryptjs";

import { UserEntity } from "~/modules/core/user/user.entity";
import { UserService } from "~/modules/core/user/service/user.service";
import { ContextService } from "~/providers/context.service";
import { UtilsService } from "~/providers/utils.service";
import { ConfigService } from "~/modules/shared/services/config.service";

import { TokenDto } from "../dto/token.dto";
import { UserAndAuthTokenDto } from "../dto/user_and_access_token.dto";
import { SignInDto } from "../dto/signin.dto";
import { SignUpDto } from "../dto/signup.dto";
import { IAuthService } from "./auth.service.interface";
import { GetAuthUser, SetAuthUser } from "../type/method";

@Injectable()
export class AuthService implements IAuthService {
  private static authUserKey = "@user_secret";

  constructor(
    private readonly jwt: JwtService,
    private readonly cfg: ConfigService,
    private readonly userService: UserService,
    @InjectSentry() private readonly setnry: SentryService
  ) {}

  // static
  static setAuthUser: SetAuthUser = (u: UserEntity) => {
    ContextService.set(AuthService.authUserKey, u);
  };
  static getAuthUser: GetAuthUser = () =>
    ContextService.get(AuthService.authUserKey);
  readonly signIn = async (d: SignInDto) => {
    const { username, password } = d;
    const { salt, ulid } = await this.verifyUser(username);
    await this.validatePW(password, salt);

    return this.createUserAndAuthToken(ulid);
  };
  readonly signUp = async (d: SignUpDto) => {
    const { ulid } = await this.userService.create(d);

    return this.createUserAndAuthToken(ulid);
  };
  readonly signOut = async (ulid: string) => {
    await this.userService.update({
      ulid,
      user: {
        refresh: null
      }
    });
    return true;
  };

  // util
  readonly createAccessToken = async (ulid: string) =>
    new TokenDto({
      expiresIn: this.cfg.getNumber("JWT_ACCESS_TOKEN_EXPIRATION_TIME"),
      token: await this.jwt.signAsync(
        { ulid },
        {
          secret: this.cfg.get("JWT_ACCESS_TOKEN_SECRET")
        }
      )
    });
  readonly createOrUpdateRefreshToken = async (ulid: string) => {
    const refreshToken = new TokenDto({
      expiresIn: this.cfg.getNumber("JWT_REFRESH_TOKEN_EXPIRATION_TIME"),
      token: await this.jwt.signAsync(
        { ulid },
        {
          secret: this.cfg.get("JWT_REFRESH_TOKEN_SECRET")
        }
      )
    });

    return refreshToken;
  };
  readonly createUserAndAuthToken = async (ulid: string) => {
    const { token: accessToken } = await this.createAccessToken(ulid);
    const { token: refreshToken } = await this.createOrUpdateRefreshToken(ulid);

    const refresh = hashSync(refreshToken, 10);

    await this.userService.update({
      ulid,
      user: {
        refresh
      }
    });
    const user = await this.userService.findOne(ulid);

    return new UserAndAuthTokenDto(user, { accessToken, refreshToken });
  };
  readonly verifyUser = async (username: string) =>
    this.userService.verifyUsername(username);
  readonly validatePW = async (password: string, hash: string) => {
    const isPasswordValid = await UtilsService.validateHash(password, hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid Password");
    }
    return isPasswordValid;
  };
  readonly refreshToken = async (ulid: string, oldRT: string) => {
    const user = await this.userService.matchRefreshToken({
      ulid,
      refresh: oldRT
    });

    const { token: accessToken } = await this.createAccessToken(user.ulid);
    const { token: refreshToken } = await this.createOrUpdateRefreshToken(ulid);

    return new UserAndAuthTokenDto(user, {
      accessToken,
      refreshToken
    });
  };
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenPayload } from "~/interfaces/token.interface";
import { UserService } from "~/modules/core/user/service/user.service";
import { ConfigService } from "~/modules/shared/services/config.service";

import { UserDetailDto } from "../user/dto/user_detail.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly cfg: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.get("JWT_ACCESS_TOKEN_SECRET")
    });
  }

  async validate({ iat, exp, ulid }: TokenPayload): Promise<UserDetailDto> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(ulid);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { user };
  }
}

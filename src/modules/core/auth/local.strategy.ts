import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { UserDetailDto } from "../user/dto/user_detail.dto";
import { AuthService } from "./service/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string): Promise<UserDetailDto> {
    const user = await this.authService.verifyUser(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { user };
  }
}

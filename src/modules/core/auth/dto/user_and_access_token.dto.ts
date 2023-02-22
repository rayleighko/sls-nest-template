import { UserDto } from "~/modules/core/user/dto/User.dto";

import { AuthTokenDto } from "./auth_token.dto";

export class UserAndAuthTokenDto {
  user: UserDto;
  authToken: AuthTokenDto;

  constructor(user: UserDto, authToken: AuthTokenDto) {
    this.user = user;
    this.authToken = authToken;
  }
}

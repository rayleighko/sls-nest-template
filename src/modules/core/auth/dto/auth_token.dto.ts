export class AuthTokenDto {
  accessToken: string;
  refreshToken: string;

  constructor(refreshToken: string, accessToken: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}

export interface TokenPayload {
  ulid: string;
  iat: number;
  exp: number;
}
export interface Token {
  expiresIn: number;
  token: string;
}

export interface TokenError {
  name: string;
  message: string;
  expiredAt: Date;
}

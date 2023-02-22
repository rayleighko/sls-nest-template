import { Token } from "~/interfaces/token.interface";

export class TokenDto {
  expiresIn: number;
  token: string;

  constructor(token: Token) {
    this.expiresIn = token.expiresIn;
    this.token = token.token;
  }
}

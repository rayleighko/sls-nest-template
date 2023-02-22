import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}

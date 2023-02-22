import { UserEntity } from "../../user/user.entity";
import { TokenDto } from "../dto/token.dto";
import { UserAndAuthTokenDto } from "../dto/user_and_access_token.dto";
import { SignInDto } from "../dto/signin.dto";
import { SignUpDto } from "../dto/signup.dto";
import { UserDto } from "../../user/dto/User.dto";

// static
export type SetAuthUser = (u: UserEntity) => void;
export type GetAuthUser = (u: UserEntity) => UserEntity;

// client <-> controller
export type CreateAccessToken = (userId: string) => Promise<TokenDto>;
export type CreateOrUpdateRefreshToken = (ulid: string) => Promise<TokenDto>;
export type CreateUserAndAuthToken = (
  ulid: string
) => Promise<UserAndAuthTokenDto>;
export type ValidateUser = (
  username: string,
  password: string
) => Promise<UserDto>;
export type SignIn = (d: SignInDto) => Promise<UserAndAuthTokenDto>;
export type SignUp = (d: SignUpDto) => Promise<UserAndAuthTokenDto>;
export type SignOut = (ulid: string) => Promise<boolean>;
export type VerifyUserAccount = (username: string) => Promise<UserDto>;
export type ValidatePW = (password: string, hash: string) => Promise<boolean>;
export type RefreshToken = (
  ulid: string,
  oldRT: string
) => Promise<UserAndAuthTokenDto>;

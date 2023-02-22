import {
  CreateAccessToken,
  CreateOrUpdateRefreshToken,
  CreateUserAndAuthToken,
  RefreshToken,
  SignIn,
  SignOut,
  SignUp,
  ValidatePW,
  ValidateUser
} from "../type/method";

export interface IAuthService {
  readonly createAccessToken: CreateAccessToken;
  readonly createOrUpdateRefreshToken: CreateOrUpdateRefreshToken;
  readonly createUserAndAuthToken: CreateUserAndAuthToken;
  readonly signIn: SignIn;
  readonly signUp: SignUp;
  readonly signOut: SignOut;
  readonly validatePW: ValidatePW;
  readonly verifyUser: ValidateUser;
  readonly refreshToken: RefreshToken;
}

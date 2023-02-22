import {
  CreateUser,
  FindOneUser,
  FindOneById,
  FindOneWithDetail,
  UpdateUser,
  DeleteUser,
  MatchRefreshToken,
  PaginateAllUser,
  VerifyUsername
} from "../type/method";

export interface IUserService {
  readonly create: CreateUser;
  readonly findOne: FindOneUser;
  readonly findOneWithDetail: FindOneWithDetail;
  readonly findOneById: FindOneById;
  readonly paginateAll: PaginateAllUser;
  readonly update: UpdateUser;
  readonly delete: DeleteUser;
  readonly verifyUsername: VerifyUsername;
  readonly matchRefreshToken: MatchRefreshToken;
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";

import { AuthService } from "~/modules/core/auth/service/auth.service";
import { UserEntity } from "~/modules/core/user/user.entity";

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const user = <UserEntity>request.user;

    AuthService.setAuthUser(user);

    return next.handle();
  }
}

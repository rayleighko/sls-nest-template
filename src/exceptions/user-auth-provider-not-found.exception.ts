import { NotFoundException } from "@nestjs/common";

export class UserAuthProviderNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super("error.user_auth_provider_not_found", message);
  }
}

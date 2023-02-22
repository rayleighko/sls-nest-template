import { NotFoundException } from "@nestjs/common";

export class UserProfileNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super("error.user_profile.not_found", message);
  }
}

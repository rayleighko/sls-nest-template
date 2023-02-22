import { NotFoundException } from "@nestjs/common";

export class UserFamilyNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super("error.user_family.not_found", message);
  }
}

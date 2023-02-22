import { NotFoundException } from "@nestjs/common";

export class UserLicenseNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super("error.user_license.not_found", message);
  }
}

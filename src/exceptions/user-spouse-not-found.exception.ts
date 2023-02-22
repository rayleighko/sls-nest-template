import { NotFoundException } from "@nestjs/common";

export class UserSpouseNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super("error.user_spouse.not_found", message);
  }
}

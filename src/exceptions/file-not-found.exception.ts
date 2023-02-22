import { NotFoundException } from "@nestjs/common";

export class FileNotFoundException extends NotFoundException {
  constructor(message?: string | any, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super("error.file.not_found");
    }
  }
}

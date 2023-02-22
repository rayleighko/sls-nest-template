import { NotFoundException } from "@nestjs/common";

export class Web3ClientNotFoundException extends NotFoundException {
  constructor(message?: string | any, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super("error.web3-client.not_found");
    }
  }
}

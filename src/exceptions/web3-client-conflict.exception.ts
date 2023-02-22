import { ConflictException } from "@nestjs/common";

export class Web3ClientConflictException extends ConflictException {
  constructor(message?: string | any, error?: string) {
    if (message) {
      super(message, error);
    } else {
      super("error.web3-client.conflict");
    }
  }
}

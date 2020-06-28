import { UseCaseError } from 'src/core/useCaseError.abstract';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameTakenError extends UseCaseError {
  constructor(username: string) {
    super(`The username ${username} was already taken`);
  }

  throw() {
    throw new HttpException(this.message, HttpStatus.CONFLICT);
  }
}

export class GeneralError extends UseCaseError {
  constructor(message: string) {
    super(message);
  }

  throw() {
    throw new HttpException(this.message, HttpStatus.CONFLICT);
  }
}

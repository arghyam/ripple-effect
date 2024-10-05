import { BaseError } from './BaseError';

export class AuthError extends BaseError {
  constructor(message: string, errorCode: string) {
    super(message, 404, errorCode);
  }
}
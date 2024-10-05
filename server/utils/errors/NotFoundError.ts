import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, errorCode: string) {
    super(message, 404, errorCode);
  }
}
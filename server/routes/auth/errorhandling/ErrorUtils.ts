
export class AuthError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'AuthError';
  }
}



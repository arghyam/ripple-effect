
export class WaterFtCalcError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'WaterFtCalcError';
  }
}
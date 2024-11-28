import { ValidationError } from '../../ValidationError/interfaces/ValidationError';

class DefaultGameErrorDTO {
  private _continuable: boolean;
  private _detail: ValidationError;

  constructor(continuable: boolean, detail: ValidationError) {
    this._continuable = continuable;
    this._detail = detail;
  }
  get continuable() {
    return this._continuable;
  }
  get detail() {
    return this._detail;
  }
}

export default DefaultGameErrorDTO;

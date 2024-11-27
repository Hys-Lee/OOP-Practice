interface ErrorDTO {
  reasons: string[];
}

class GameErrorDTO extends Error implements ErrorDTO {
  private _reasons: string[];
  constructor(reasons: string[], message: string = '기본 에러 메시지') {
    super(message);
    this._reasons = reasons;
  }
  get reasons() {
    return this._reasons;
  }
}

export { ErrorDTO, GameErrorDTO };

interface ErrorDTO {
  reasons: string[];
}

class GameErrorDTO extends Error implements ErrorDTO {
  private _reasons: string[];
  constructor(reasons: string[], message?: string) {
    super(message);
    this._reasons = reasons;
  }
  get reasons() {
    return this._reasons;
  }
}

export { ErrorDTO, GameErrorDTO };

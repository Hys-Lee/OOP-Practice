interface ErrorDTO {
  reasons: string[];
}

class GameErrorDTO extends Error implements ErrorDTO {
  private _reasons: string[];
  constructor(reasons: string[]) {
    super();
    this._reasons = reasons;
  }
  get reasons() {
    return this._reasons;
  }
}

export { ErrorDTO, GameErrorDTO };

interface GameConfigDTO {
  phase: number;
  dataLen: number;
}
class DefaultGameConfigDTO implements GameConfigDTO {
  private _phase: number;
  private _dataLen: number;
  constructor(phase: number, dataLen: number) {
    this._phase = phase;
    this._dataLen = dataLen;
  }
  get phase() {
    return this._phase;
  }
  get dataLen() {
    return this._dataLen;
  }
}

export default DefaultGameConfigDTO;
export { GameConfigDTO };

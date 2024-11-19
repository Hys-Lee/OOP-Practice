class GameResultDTO {
  private _curPhase;
  private _isEnd;
  private _pitchingResult;
  constructor({ curPhase, isEnd, pitchingResult }) {
    this._curPhase = curPhase;
    this._isEnd = isEnd;
    this._pitchingResult = pitchingResult;
  }
  get pitchingResult() {
    return {
      curPhase: this._curPhase,
      isEnd: this._isEnd,
      pitchingResult: this._pitchingResult,
    };
  }
}

export default GameResultDTO;

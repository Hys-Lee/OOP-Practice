import { PitchingResult } from '../../services/DataTypes';

interface GameResult {
  leftPhase: number;
  isEnd: boolean;
  pitchingResult: PitchingResult;
}
class GameResultDTO {
  private _leftPhase;
  private _isEnd;
  private _pitchingResult;
  constructor({ leftPhase, isEnd, pitchingResult }) {
    this._leftPhase = leftPhase;
    this._isEnd = isEnd;
    this._pitchingResult = pitchingResult;
  }
  get pitchingResult() {
    return {
      leftPhase: this._leftPhase,
      isEnd: this._isEnd,
      pitchingResult: this._pitchingResult,
    };
  }
}

export default GameResultDTO;

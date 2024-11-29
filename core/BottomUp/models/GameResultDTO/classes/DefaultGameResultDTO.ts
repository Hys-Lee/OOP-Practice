import { JudgeResult } from '../../JudgeResult/interfaces/JudgeResult';
import { GameResultDTO } from '../interfaces/GameResultDTO';

class DefaultGameResultDTO implements GameResultDTO {
  private _isSuccess: boolean;
  private _detailResult: JudgeResult;
  private _remainPhase: number;
  constructor(
    isSuccess: boolean,
    detailResult: JudgeResult,
    remainPhase: number
  ) {
    this._isSuccess = isSuccess;
    this._detailResult = detailResult;
    this._remainPhase = remainPhase;
  }
  get isSuccess() {
    return this._isSuccess;
  }
  get detailResult() {
    return this._detailResult;
  }
  get remainPhase() {
    return this._remainPhase;
  }
}

export default DefaultGameResultDTO;

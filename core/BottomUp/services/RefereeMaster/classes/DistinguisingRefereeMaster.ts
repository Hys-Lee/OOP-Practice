import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import SubReferee from '../../SubReferee/types/SubReferee';
import { RefereeMasters } from '../interfaces/RefereeMaster';
import { JudgeResult } from '../../../models/JudgeResult/interfaces/JudgeResult';

class DistinguisingRefereeMaster implements RefereeMasters {
  constructor() {}

  // judgeHandling
  private _judgeForSubReferee(
    input: PitchingDTO,
    answer: PitchingDTO,
    subReferees: SubReferee[]
  ) {
    const totalJudges = subReferees.reduce((acc, curSubReferee) => {
      const judgeRes: JudgeResult = curSubReferee.judge(input, answer);

      return { ...acc, ...judgeRes };
    }, {} as JudgeResult);

    return totalJudges;
  }

  // conclusion
  private _concludeSuccess(determinateResults: JudgeResult, dataLen: number) {
    if (determinateResults['strike'] === dataLen) {
      return true;
    }
    return false;
  }
  private _concludeDeterminates(
    determinateResults: JudgeResult,
    dataLen: number
  ) {
    const isSuccess = this._concludeSuccess(determinateResults, dataLen);
    return { isSuccess };
  }

  result(
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[],
    indeterminateSubReferees: SubReferee[],
    dataLen: number
  ) {
    const determinateResults: JudgeResult = this._judgeForSubReferee(
      input,
      answer,
      determinateSubReferees
    );

    const determinateConclusion = this._concludeDeterminates(
      determinateResults,
      dataLen
    );

    const indeterminateResults: JudgeResult = this._judgeForSubReferee(
      input,
      answer,
      indeterminateSubReferees
    );

    return {
      detailResult: { ...determinateResults, ...indeterminateResults },
      ...determinateConclusion,
    };
  }
}
export default DistinguisingRefereeMaster;

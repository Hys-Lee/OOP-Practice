import DefaultStrikeReferee from '../../SubReferee/StrikeReferee/classes/DefaultStrikeReferee';
import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import SubReferee from '../../SubReferee/types/SubReferee';
import { RefereeMasters } from '../interfaces/RefereeMaster';
import { JudgeResult } from '../../../models/JudgeResult/interfaces/JudgeResult';
import DefaultBallReferee from '../../SubReferee/BallRefree/classes/DefaultBallReferee';

class DistinguisingRefereeMaster implements RefereeMasters {
  constructor() {}

  // judgeHandling
  private _judgeForSubReferee<T extends SubReferee>(
    input: PitchingDTO,
    answer: PitchingDTO,
    subReferees: SubReferee[],
    targetRefereeClasses: (new () => T)[]
  ) {
    const findMatchedClass = (curSubReferee: SubReferee) =>
      targetRefereeClasses.find(
        (refereeClass) => curSubReferee instanceof refereeClass
      );

    const totalTargetedJudges = subReferees.reduce((acc, curSubReferee) => {
      if (findMatchedClass(curSubReferee)) {
        const judgeRes: JudgeResult = curSubReferee.judge(input, answer);

        return { ...acc, ...judgeRes };
      }
      return { ...acc };
    }, {} as JudgeResult);

    return totalTargetedJudges;
  }

  private _resultFromDeterminates(
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[],
    determinateSubRefereeClasses: (new () => SubReferee)[]
  ) {
    const determinateJudges = this._judgeForSubReferee(
      input,
      answer,
      determinateSubReferees,
      determinateSubRefereeClasses
    );

    return determinateJudges;
  }
  private _resultFromIndeterminates(
    input: PitchingDTO,
    answer: PitchingDTO,
    indeterminateSubReferees: SubReferee[],
    indeterminateSubRefereeClasses: (new () => SubReferee)[]
  ) {
    const indeterminateJudges = this._judgeForSubReferee(
      input,
      answer,
      indeterminateSubReferees,
      indeterminateSubRefereeClasses
    );
    return indeterminateJudges;
  }

  // conclusion
  private _concludeSuccess(determinateResults: JudgeResult) {
    if (determinateResults['strike'] === 3) {
      return true;
    }
    return false;
  }
  private _concludeDeterminates(determinateResults: JudgeResult) {
    const isSuccess = this._concludeSuccess(determinateResults);
    return { isSuccess };
  }

  result(
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[],
    determinateRefereeClasses: (new () => SubReferee)[],
    indeterminateSubReferees: SubReferee[],
    indeterminateRefereeClasses: (new () => SubReferee)[]
  ) {
    const determinateResults: JudgeResult = this._resultFromDeterminates(
      input,
      answer,
      determinateSubReferees,
      determinateRefereeClasses
    );

    const determinateConclusion =
      this._concludeDeterminates(determinateResults);

    const indeterminateResults: JudgeResult = this._resultFromIndeterminates(
      input,
      answer,
      indeterminateSubReferees,
      indeterminateRefereeClasses
    );

    return {
      detailResult: { ...determinateResults, ...indeterminateResults },
      ...determinateConclusion,
    };
  }
}
export default DistinguisingRefereeMaster;

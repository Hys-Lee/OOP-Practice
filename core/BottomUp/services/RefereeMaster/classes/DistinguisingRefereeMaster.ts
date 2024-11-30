import DefaultStrikeReferee from '../../SubReferee/StrikeReferee/classes/DefaultStrikeReferee';
import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import SubReferee from '../../SubReferee/types/SubReferee';
import { RefereeMasters } from '../interfaces/RefereeMaster';
import { JudgeResult } from '../../../models/JudgeResult/interfaces/JudgeResult';
import DefaultBallReferee from '../../SubReferee/BallRefree/classes/DefaultBallReferee';

class DistinguisingRefereeMaster implements RefereeMasters {
  constructor() {}

  //   private _judgeForSubReferee<T extends SubReferee>(
  //     input: PitchingDTO,
  //     answer: PitchingDTO,
  //     subReferees: SubReferee[],
  //     targetRefereeClasses: (new () => T)[]
  //   ) {
  //     const findMatchedClass = (curSubReferee: SubReferee) =>
  //       targetRefereeClasses.find(
  //         (refereeClass) => curSubReferee instanceof refereeClass
  //       );

  //     const totalTargetedJudges = subReferees.reduce((acc, curSubReferee) => {
  //       if (findMatchedClass(curSubReferee)) {
  //         const judgeRes: JudgeResult = curSubReferee.judge(input, answer);

  //         return { ...acc, ...judgeRes };
  //       } else {
  //         return { ...acc };
  //       }
  //     }, {});

  //     return totalTargetedJudges;
  //   }

  private _resultFromDeterminates(
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[]
  ) {
    const results: JudgeResult = determinateSubReferees.reduce(
      (acc, curSubReferee: SubReferee) => {
        if (curSubReferee instanceof DefaultStrikeReferee) {
          const strikeRes = curSubReferee.judge(input, answer);
          return { ...acc, ...strikeRes };
        } else {
          return { ...acc };
        }
      },
      {}
    );
    // const determinateSubRefereeClasses = [DefaultStrikeReferee];
    // const determinateJudges = this._judgeForSubReferee(
    //   input,
    //   answer,
    //   determinateSubReferees,
    //   determinateSubRefereeClasses
    // );

    // return determinateJudges;
  }
  private _resultFromIndeterminates(
    input: PitchingDTO,
    answer: PitchingDTO,
    indeterminateSubReferees: SubReferee[]
  ) {
    // const indeterminateSubRefereeClasses = [DefaultStrikeReferee];
    // const indeterminateJudges = this._judgeForSubReferee(
    //   input,
    //   answer,
    //   indeterminateSubReferees,
    //   indeterminateSubRefereeClasses
    // );
    // return indeterminateJudges;
  }

  result(
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[],
    indeterminateSubReferees: SubReferee[]
  ) {
    // const determinateResults: JudgeResult = this._resultFromDeterminates(
    //   input,
    //   answer,
    //   determinateSubReferees
    // );

    this._resultFromIndeterminates(input, answer, indeterminateSubReferees);
    // return { detailResult: determinateResults, isSuccess: true };
  }
}
export default DistinguisingRefereeMaster;

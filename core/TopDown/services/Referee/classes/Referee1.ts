import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { PitchingResult } from '../../DataTypes';
import SubReferee from '../../SubReferee/interfaces/SubReferee';
import { Referee } from '../interfaces/Referee';

class Referee1 implements Referee {
  private subReferees: SubReferee[];
  constructor(subReferees: SubReferee[]) {
    this.subReferees = subReferees;
  }
  judge(input: PitchingDTO, answer: PitchingDTO) {
    const subRefereeResults = this.subReferees.map((subReferee) =>
      subReferee.judge(input, answer)
    );

    const judgeResult = subRefereeResults.reduce(
      (acc, cur) => ({ ...acc, [cur.type]: cur.result }),
      {} as PitchingResult
    );

    return judgeResult;
  }
}

export default Referee1;

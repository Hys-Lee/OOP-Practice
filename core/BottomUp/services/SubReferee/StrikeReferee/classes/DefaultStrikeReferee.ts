import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { StrikeReferee } from '../interfaces/StrikeReferee';

class DefaultStrikeReferee implements StrikeReferee {
  constructor() {}
  judge(input: PitchingDTO, answer: PitchingDTO) {
    let strikeCount = 0;
    for (let i = 0; i < answer.pitchingData.length; i++) {
      if (answer.pitchingData[i] === input.pitchingData[i]) strikeCount += 1;
    }
    return { strike: strikeCount };
  }
}

export default DefaultStrikeReferee;

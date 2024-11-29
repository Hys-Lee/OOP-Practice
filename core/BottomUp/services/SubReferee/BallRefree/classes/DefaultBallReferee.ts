import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { BallReferee } from '../interfaces/BallReferee';

class DefaultBallReferee implements BallReferee {
  judge(input: PitchingDTO, answer: PitchingDTO) {
    const arrAnswer = Array.from(answer.pitchingData);
    const arrInput = Array.from(input.pitchingData);
    let ballCount = 0;
    for (let i = 0; i < arrAnswer.length; i++) {
      if (arrInput[i] !== arrAnswer[i] && arrInput.includes(arrAnswer[i]))
        ballCount += 1;
    }
    return { ball: ballCount };
  }
}

export default DefaultBallReferee;

import { SubRefereeResult } from './DataTypes';
import PitchingDTO from '../model/PitchingDTO/PithcingDTO';

interface SubReferee {
  judge: (input: PitchingDTO, answer: PitchingDTO) => SubRefereeResult;
}

class StrikeReferee {
  constructor() {}
  judge(input: PitchingDTO, answer: PitchingDTO) {
    // 정확한 위치에 정확한 값

    const strikePitching = input.pitchingData.filter(
      (value, idx) => answer.pitchingData[idx] === value
    );

    const strikePitchingCount = strikePitching.length;

    return { type: 'strike', result: strikePitchingCount };
  }
}

class BallReferee {
  constructor() {}
  judge(input: PitchingDTO, answer: PitchingDTO) {
    // 다른 위치에 값 존재.

    const ballPitching = input.pitchingData.filter((value, idx) => {
      return (
        answer.pitchingData[idx] !== value && // 다른 위치
        answer.pitchingData.includes(value) // 값 존재
      );
    });

    const ballPitchingCount = ballPitching.length;

    return ballPitchingCount;
  }
}

export { StrikeReferee, BallReferee };

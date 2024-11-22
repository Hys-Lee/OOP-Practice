import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import SubReferee from '../interfaces/SubReferee';
class BallReferee implements SubReferee {
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

    return { type: 'ball', result: ballPitchingCount };
  }
}

export default BallReferee;

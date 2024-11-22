import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import SubReferee from '../interfaces/SubReferee';
class StrikeReferee implements SubReferee {
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
export default StrikeReferee;

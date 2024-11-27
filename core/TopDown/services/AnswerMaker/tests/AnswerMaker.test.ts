import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
} from '../../../model/PitchingDTO/PitchingDTOGuard';
import RandomAnswerMaker from '../classes/RandomAnswerMaker';

describe('AnswerMaker 테스트', () => {
  const typePitchingDTOGuard = new TypePitchingDTOGuard();
  const identityPitchingDTOGuard = new IdentityNumberPitchingDTOGuard();
  const ram = new RandomAnswerMaker(
    typePitchingDTOGuard,
    identityPitchingDTOGuard
  );
  test('4자리 answer의 unique 테스트', () => {
    const answer = ram.makeAnswer(4);

    const isUnique = answer.pitchingData.every(
      (value, idx) =>
        !answer.pitchingData
          .filter((oriV, oriI) => oriI !== idx)
          .includes(value)
    );

    expect(isUnique).toBe(true);
  });
});

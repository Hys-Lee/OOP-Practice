import RandomAnswerMaker from '../classes/RandomAnswerMaker';

describe('AnswerMaker 테스트', () => {
  const ram = new RandomAnswerMaker();
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

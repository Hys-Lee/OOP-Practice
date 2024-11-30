import RandomAnswerMaker from '../classes/RandomAnswerMaker';

describe('AnswerMaker 테스트', () => {
  test('RandomAnswerMaker의 uniqueness테스트', () => {
    const am = new RandomAnswerMaker();
    const fourLenUnique = am.makeAnswer(4);

    const result = fourLenUnique.pitchingData.every((targetValue, index) => {
      return (
        fourLenUnique.pitchingData.filter((val) => val === targetValue)
          .length === 1
      );
    });
    expect(result).toBe(true);
  });
});

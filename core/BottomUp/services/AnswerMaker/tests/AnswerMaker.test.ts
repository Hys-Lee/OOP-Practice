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
  test('RandomAnswerMaker의 정수 배열 반호나 테스트', () => {
    const am = new RandomAnswerMaker();
    const fourLenInteger = am.makeAnswer(4);
    const isAllInteger = fourLenInteger.pitchingData.every(
      (value) => Number.isInteger(value) && !Number.isNaN(value)
    );

    expect(isAllInteger).toBe(true);
  });
});

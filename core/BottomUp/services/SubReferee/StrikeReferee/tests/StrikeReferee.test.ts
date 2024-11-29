import ArrayPitchingDTO from '../../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import DefaultStrikeReferee from '../classes/DefaultStrikeReferee';

describe('스트라이크 심판 테스트', () => {
  const strikeReferee = new DefaultStrikeReferee();
  const answer = new ArrayPitchingDTO([1, 2, 3]);
  test('2 스트라이크', () => {
    const input = new ArrayPitchingDTO([1, 2, 4]);
    const result = strikeReferee.judge(input, answer);
    expect(result).toEqual({ strike: 2 });
  });
  test('0 스트라이크', () => {
    const input = new ArrayPitchingDTO([7, 8, 9]);
    const result = strikeReferee.judge(input, answer);
    expect(result).toEqual({ strike: 0 });
  });
});

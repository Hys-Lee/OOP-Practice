import ArrayPitchingDTO from '../../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import DefaultBallReferee from '../classes/DefaultBallReferee';

describe('볼 심판 테스트', () => {
  const ballReferee = new DefaultBallReferee();
  const answer = new ArrayPitchingDTO([1, 2, 3]);
  test('2 볼', () => {
    const input = new ArrayPitchingDTO([2, 3, 4]);
    const result = ballReferee.judge(input, answer);
    expect(result).toEqual({ ball: 2 });
  });
  test('0 볼', () => {
    const input = new ArrayPitchingDTO([4, 5, 6]);
    const result = ballReferee.judge(input, answer);
    expect(result).toEqual({ ball: 0 });
  });
});

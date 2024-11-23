import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import StrikeReferee from '../../SubReferee/classes/StrikeReferee';
import Referee1 from '../classes/Referee1';

describe('Referee 테스트', () => {
  type subRefereeType = 'strike' | 'ball';
  const subRefereeMaker = (type: subRefereeType, count: number) => {
    return jest.fn().mockImplementation(() => {
      return {
        judge: () => ({
          type: type,
          result: count,
        }),
      };
    });
  };

  const emptyInput = new PitchingDTO([]);
  const emptyAnswer = new PitchingDTO([]);

  test('strike3', () => {
    const StrikeReferee = subRefereeMaker('strike', 3);
    const BallReferee = subRefereeMaker('ball', 0);

    const r = new Referee1([new StrikeReferee(), new BallReferee()]);

    expect(r.judge(emptyInput, emptyAnswer)).toEqual({
      strike: 3,
      ball: 0,
    });
  });
  test('strike1, ball 1', () => {
    const StrikeReferee = subRefereeMaker('strike', 1);
    const BallReferee = subRefereeMaker('ball', 1);

    const r = new Referee1([new StrikeReferee(), new BallReferee()]);

    expect(r.judge(emptyInput, emptyAnswer)).toEqual({
      strike: 1,
      ball: 1,
    });
  });
  test('ball2', () => {
    const StrikeReferee = subRefereeMaker('strike', 0);
    const BallReferee = subRefereeMaker('ball', 2);

    const r = new Referee1([new StrikeReferee(), new BallReferee()]);

    expect(r.judge(emptyInput, emptyAnswer)).toEqual({
      strike: 0,
      ball: 2,
    });
  });
  test('nothing', () => {
    const StrikeReferee = subRefereeMaker('strike', 0);
    const BallReferee = subRefereeMaker('ball', 0);

    const r = new Referee1([new StrikeReferee(), new BallReferee()]);

    expect(r.judge(emptyInput, emptyAnswer)).toEqual({
      strike: 0,
      ball: 0,
    });
  });
});

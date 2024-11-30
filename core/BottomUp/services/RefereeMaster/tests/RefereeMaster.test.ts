import { JudgeResult } from '../../../models/JudgeResult/interfaces/JudgeResult';
import ArrayPitchingDTO from '../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import DefaultBallReferee from '../../SubReferee/BallRefree/classes/DefaultBallReferee';
import DefaultStrikeReferee from '../../SubReferee/StrikeReferee/classes/DefaultStrikeReferee';
import { StrikeReferee } from '../../SubReferee/StrikeReferee/interfaces/StrikeReferee';
import SubReferee from '../../SubReferee/types/SubReferee';
import DistinguisingRefereeMaster from '../classes/DistinguisingRefereeMaster';

jest.mock('../../SubReferee/StrikeReferee/classes/DefaultStrikeReferee');
jest.mock('../../SubReferee/BallRefree/classes/DefaultBallReferee');

describe('마스터 심판 테스트', () => {
  const rm = new DistinguisingRefereeMaster();
  const meaningLessInput = new ArrayPitchingDTO([]);
  const meaningLessAnswer = new ArrayPitchingDTO([]);
  const mockRefereeJudge = (referee: SubReferee, judgeResult: JudgeResult) => {
    (referee.judge as jest.Mock).mockImplementation(() => judgeResult);
  };

  test('스트라이크 3일 때 Success여야 함.', () => {
    const mockedStrikeReferee = new DefaultStrikeReferee();
    mockRefereeJudge(mockedStrikeReferee, { strike: 3 });
    const mockedBallReferee = new DefaultBallReferee();
    mockRefereeJudge(mockedBallReferee, { ball: 0 });
    const dataLen = 3;

    const conclusion = rm.result(
      meaningLessInput,
      meaningLessAnswer,
      [mockedStrikeReferee],
      [mockedBallReferee],
      dataLen
    );

    expect(conclusion).toEqual({
      detailResult: {
        strike: 3,
        ball: 0,
      },
      isSuccess: true,
    });
  });
  test('스트라이크 1, 볼 3일 때는 UnSuccess', () => {
    const mockedStrikeReferee = new DefaultStrikeReferee();
    mockRefereeJudge(mockedStrikeReferee, { strike: 1 });
    const mockedBallReferee = new DefaultBallReferee();
    mockRefereeJudge(mockedBallReferee, { ball: 3 });
    const dataLen = 4;

    const conclusion = rm.result(
      meaningLessInput,
      meaningLessAnswer,
      [mockedStrikeReferee],
      [mockedBallReferee],
      dataLen
    );

    expect(conclusion).toEqual({
      detailResult: {
        strike: 1,
        ball: 3,
      },
      isSuccess: false,
    });
  });
});

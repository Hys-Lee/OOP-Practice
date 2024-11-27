import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { Guard } from '../../Guard/interfaces/Guard';
import { Referee } from '../../Referee/interfaces/Referee';
import Game1 from '../classes/NumberBaseballGame';

describe('Game 테스트', () => {
  const emptyConfig = {} as GameConfigDTO;
  const emptyAnswer = {} as PitchingDTO;
  const emptyInput = {} as PitchingDTO;

  test('validate틀리면 error throw하는지', () => {
    const MockGuard = jest.fn().mockImplementation(() => {
      return {
        validate: () => ['phase', 'type'],
      };
    });

    const MockReferee = jest.fn().mockImplementation(() => {
      return {
        judge: () => {},
      };
    });

    const guard = new MockGuard() as Guard;
    const referee = new MockReferee() as Referee;
    const meaninglessPhase = 0;
    const g = new Game1(emptyConfig, guard, referee, emptyAnswer);
    //에러 타입
    expect(() => {
      g.proceed(emptyInput, meaninglessPhase);
    }).toThrow(GameErrorDTO);
    //에러 내용
    expect(() => {
      g.proceed(emptyInput, meaninglessPhase);
    }).toThrow(
      expect.objectContaining({
        reasons: expect.arrayContaining(['phase', 'type']),
      })
    );
  });

  test('judge체크', () => {
    const MockGuard = jest.fn().mockImplementation(() => {
      return {
        validate: () => [],
      };
    });
    const answer = { strike: 1, ball: 2 };
    const MockReferee = jest.fn().mockImplementation(() => {
      return {
        judge: () => answer,
      };
    });

    const guard = new MockGuard() as Guard;
    const referee = new MockReferee() as Referee;
    const meaninglessPhase = 0;
    const g = new Game1(emptyConfig, guard, referee, emptyAnswer);
    // console.log('guard, referee: ', guard.validate(), referee.judge());
    expect(g.proceed(emptyInput, meaninglessPhase)).toEqual(answer);
  });
});

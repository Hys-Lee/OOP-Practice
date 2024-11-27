import NumberBaseballGame from '../../../services/Game/classes/NumberBaseballGame';
import DefaultGameController from '../classes/DefaultGameController';
import { PitchingResult } from '../../../services/DataTypes';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';
import GameResultDTO from '../../../model/Game/GameResultDTO';
import { mock } from 'node:test';

describe('게임 컨트롤러 테스트', () => {
  const EmtpyGame = jest.fn().mockImplementation(() => {
    return {
      proceed: () => ({} as PitchingResult),
      getConfigPhase: () => 1,
    };
  });

  const ThreePhaseGame = jest.fn().mockImplementation(() => {
    return {
      proceed: () => ({ strike: 1, ball: 1 } as PitchingResult),
      getConfigPhase: () => 3,
    };
  });
  const PerfectGame = jest.fn().mockImplementation(() => {
    return {
      proceed: () => ({ strike: 3, ball: 0 } as PitchingResult),
      getConfigPhase: () => 10,
    };
  });

  test('proceed 테스트 - Invalid inputDTO변환', () => {
    const mockGame = new EmtpyGame();

    const gameController = new DefaultGameController(mockGame);

    expect(() => {
      gameController.proceed(['1', 2, 3]);
    }).toThrow(expect.objectContaining({ message: '입력 값 에러' }));
    expect(() => {
      gameController.proceed([1, 1, 2]);
    }).toThrow(expect.objectContaining({ message: '입력 값 에러' }));
  });

  test('proceed 테스트 - Valid inputDTO변환', () => {
    const mockGame = new EmtpyGame();
    const gameController = new DefaultGameController(mockGame);
    expect(() => gameController.proceed([1, 2, 3])).not.toThrow();
  });
  test('proceed 테스트 - Invalid proceed에러 처리 - Guard Error', () => {
    const ErrorGame = jest.fn().mockImplementation(() => {
      return {
        proceed: () => {
          throw new GameErrorDTO(['임시 에러']);
        },
        getConfigPhase: () => 1,
      };
    });
    const mockGame = new ErrorGame();
    const gameController = new DefaultGameController(mockGame);
    expect(() => gameController.proceed([1, 2, 3])).toThrow(GameErrorDTO);
    expect(() => gameController.proceed([1, 2, 3])).toThrow(
      expect.objectContaining({
        reasons: ['임시 에러'],
        message: '부적절한 게임 입력',
      })
    );
  });

  /**
   * 이 부분은 phaseGuard랑 하는일이 겹쳐서 제외.
   */
  //   test('proceed 테스트 - Invalid proceed에러 처리 - 페이즈 Error', () => {
  //     const mockGame = new ThreePhaseGame();

  //     const gameController = new DefaultGameController(mockGame);
  //     expect(() => {
  //       for (let i = 0; i < 4; i++) {
  //         gameController.proceed([1, 2, 3]);
  //       }
  //     }).toThrow(
  //       new GameErrorDTO(['마지막 페이즈였습니다'], '부적절한 게임 입력')
  //     );
  //   });    =

  test('proceed 테스트 - Valid proceed 반환 : 일반', () => {
    const mockGame = new ThreePhaseGame();

    const gameController = new DefaultGameController(mockGame);
    let result = gameController.proceed([1, 2, 3]);
    while (result.pitchingResult.leftPhase > 0) {
      result = gameController.proceed([1, 2, 3]);
    }

    expect(result).toEqual(
      new GameResultDTO({
        leftPhase: 0,
        isEnd: true,
        pitchingResult: { strike: 1, ball: 1 } as PitchingResult,
      })
    );
  });
  test('proceed 테스트 - Valid proceed 반환 : 성공', () => {
    const mockGame = new PerfectGame();

    const gameController = new DefaultGameController(mockGame);
    let result = gameController.proceed([1, 2, 3]);

    expect(result).toEqual(
      new GameResultDTO({
        leftPhase: 9,
        isEnd: true,
        pitchingResult: { strike: 3, ball: 0 } as PitchingResult,
      })
    );
  });

  test('reboot 테스트 - 상태 초기화', () => {
    const mockGame = new ThreePhaseGame();
    const gameController = new DefaultGameController(mockGame);
    gameController.proceed([1, 2, 3]);
    const result = gameController.reboot();
    expect(result).toEqual(
      new GameResultDTO({
        leftPhase: 3,
        isEnd: false,
        pitchingResult: { strike: 0, ball: 0 } as PitchingResult,
      })
    );
  });
  test('end 테스트 - game 실행 불가', () => {
    const mockGame = new ThreePhaseGame();
    const gameController = new DefaultGameController(mockGame);

    expect(() => {
      gameController.end();
      gameController.proceed([1, 2, 3]);
    }).toThrow();
  });
});

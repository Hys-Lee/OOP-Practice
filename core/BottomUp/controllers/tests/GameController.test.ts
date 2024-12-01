import PitchingDTO from '../../../TopDown/model/PitchingDTO/PithcingDTO';
import DefaultGameErrorDTO from '../../models/GameErrorDTO/classes/DefaultGameErrorDTO';
import { GameErrorDTO } from '../../models/GameErrorDTO/interfaces/GameErrorDTO';
import DefaultGameResultDTO from '../../models/GameResultDTO/classes/DefaultGameResultDTO';
import { GameResultDTO } from '../../models/GameResultDTO/interfaces/GameResultDTO';
import { JudgeConclusion } from '../../models/JudgeConclusion/interfaces/JudegeConclusion';
import { JudgeResult } from '../../models/JudgeResult/types/JudgeResult';
import PitchingGameMaster from '../../services/GameMaster/classes/PitchingGameMaster';
import DefaultGameController from '../classes/DefaultGameController';

describe('게임 컨트롤러 테스트', () => {
  const MockGameMaster = jest
    .fn()
    .mockImplementation((result: GameResultDTO, error?: GameErrorDTO) => {
      return {
        getResult: () => {
          if (error) throw error;
          return result;
        },
      };
    });
  const meaninglessInput = new PitchingDTO([]);
  test('정상적으로 진행 됨. 3 중 1 페이즈 결과', () => {
    const isSuccess = false;
    const detailResult = { strike: 2, ball: 1 } as JudgeResult;
    const remainPhase = 3 - 1;
    const gameresult = new DefaultGameResultDTO(
      isSuccess,
      detailResult,
      remainPhase
    );
    const gm = new MockGameMaster(gameresult);
    const gc = new DefaultGameController(gm);

    expect(gc.run(meaninglessInput)).toEqual(gameresult);
    expect(gc.getLastestResult()).toEqual(gameresult);
  });
  test('성공 후 게임 종료 체크', () => {
    const isSuccess = true;
    const meaninglessResult = {} as JudgeResult;
    const remainPhase = 1;
    const gameresult = new DefaultGameResultDTO(
      isSuccess,
      meaninglessResult,
      remainPhase
    );
    const gm = new MockGameMaster(gameresult);
    const gc = new DefaultGameController(gm);

    expect(gc.run(meaninglessInput).isSuccess).toBe(true);
    expect(() => {
      gc.run(meaninglessInput);
    }).toThrow('종료');
  });
  test('게임 종료된 경우 - end이후 run시도', () => {
    const isSuccess = true;
    const meaninglessResult = {} as JudgeResult;
    const remainPhase = 1;
    const gameresult = new DefaultGameResultDTO(
      isSuccess,
      meaninglessResult,
      remainPhase
    );
    const gm = new MockGameMaster(gameresult);
    const gc = new DefaultGameController(gm);

    gc.run(meaninglessInput);
    expect(gc.getLastestResult()).toEqual(gameresult);

    expect(() => {
      gc.end();
      gc.run(meaninglessInput);
    }).toThrow('종료');
  });
  test('페이즈 초과로 인한 에러 - not continuable로 게임 종료.', () => {
    const isSuccess = false;
    const meaninglessResult = {} as JudgeResult;
    const remainPhase = 0;
    const gameresult = new DefaultGameResultDTO(
      isSuccess,
      meaninglessResult,
      remainPhase
    );
    const gameerror = new DefaultGameErrorDTO(false, { phase: false });
    const gm = new MockGameMaster(gameresult, gameerror);
    const gc = new DefaultGameController(gm);

    expect(() => {
      gc.run(meaninglessInput);
    }).toThrow(expect.objectContaining(gameerror)); // 되려나?
    expect(() => {
      gc.run(meaninglessInput);
    }).toThrow('종료');
  });
  test('다른 에러. continuable해서 게임 종료되지 않음.', () => {
    const isSuccess = false;
    const meaninglessResult = {} as JudgeResult;
    const remainPhase = 2;
    const gameresult = new DefaultGameResultDTO(
      isSuccess,
      meaninglessResult,
      remainPhase
    );
    const gameerror = new DefaultGameErrorDTO(true, { len: false });
    const gm = new MockGameMaster(gameresult, gameerror);
    const gc = new DefaultGameController(gm);
    expect(() => {
      gc.run(meaninglessInput);
    }).toThrow(expect.objectContaining(gameerror)); // 되려나?
    expect(() => {
      gc.run(meaninglessInput);
    }).not.toThrow('종료');
  });
});

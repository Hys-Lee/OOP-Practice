import { config } from 'process';
import DefaultGameConfigDTO from '../../../models/GameConfigDTO/classes/DefaultGameConfigDTO';
import ArrayPitchingDTO from '../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import { ValidationError } from '../../../models/ValidationError/interfaces/ValidationError';
import PitchingGameMaster from '../classes/PitchingGameMaster';
import DefaultGameResultDTO from '../../../models/GameResultDTO/classes/DefaultGameResultDTO';
import DefaultGameErrorDTO from '../../../models/GameErrorDTO/classes/DefaultGameErrorDTO';

describe('게임 마스터 테스트: ', () => {
  const meaninglessValidationError = {
    len: false,
    phase: false,
  } as ValidationError;
  const MockGuardMaster = jest.fn().mockImplementation((isValid) => {
    return {
      check: () => {
        if (!isValid) return meaninglessValidationError;
        return {};
      },
    };
  });
  const MockRefereeMaster = jest
    .fn()
    .mockImplementation((isSuccess, detailResult) => {
      return {
        result: () => ({
          isSuccess,
          detailResult,
        }),
      };
    });

  const meaninglessInput = new ArrayPitchingDTO([]);
  const meaninglessAnswer = new ArrayPitchingDTO([]);
  const maxPhase = 3;
  const config = new DefaultGameConfigDTO(maxPhase, 0);
  test('validation에서 에러 발생', () => {
    const gmaster = new MockGuardMaster(false);
    const rmaster = new MockRefereeMaster(false, {});
    const gm = new PitchingGameMaster(
      rmaster,
      gmaster,
      meaninglessAnswer,
      config
    );
    const continuable = Object.keys(meaninglessValidationError).includes(
      'phase'
    )
      ? false
      : true;
    const gameError = new DefaultGameErrorDTO(
      continuable,
      meaninglessValidationError
    );

    expect(() => {
      gm.getResult(meaninglessInput);
    }).toThrow(expect.objectContaining(gameError));
  });
  test('Valid 시 결과 값 반환', () => {
    const gmaster = new MockGuardMaster(true);
    const mockIsSuccess = true;
    const mockDetailResult = { strike: 3, ball: 1 };
    const rmaster = new MockRefereeMaster(mockIsSuccess, mockDetailResult);
    const gm = new PitchingGameMaster(
      rmaster,
      gmaster,
      meaninglessAnswer,
      config
    );

    const result = gm.getResult(meaninglessInput);

    expect(result).toEqual(
      new DefaultGameResultDTO(mockIsSuccess, mockDetailResult, maxPhase - 1) // getResult 실행 횟수 빼기
    );
  });
});

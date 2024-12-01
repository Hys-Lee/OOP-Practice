import PitchingDTO from '../../../../TopDown/model/PitchingDTO/PithcingDTO';
import TypeGuard from '../../../../TopDown/services/SubGuard/classes/TypeGuard';
import DefaultGameConfigDTO from '../../../models/GameConfigDTO/classes/DefaultGameConfigDTO';
import ValidationTypes from '../../../models/RuleTerms/Validation/types/ValidationTypes';
import { ValidationError } from '../../../models/ValidationError/interfaces/ValidationError';
import InsensitiveGuardMaster from '../classes/InsensitiveGuardMaster';

describe('가드 마스터 테스트', () => {
  const MockSubGuard = jest
    .fn()
    .mockImplementation((type: ValidationTypes, isValid: boolean) => {
      return {
        validate: () => ({ [type]: isValid }),
      };
    });

  const meaninglessInput = new PitchingDTO([]);
  const meaninglessConfig = new DefaultGameConfigDTO(0, 0);
  const meaninglessCurPhase = 0;

  test('Valid해서 Throw 없음', () => {
    const tg = new MockSubGuard('type', true);
    const pg = new MockSubGuard('phase', true);
    const lg = new MockSubGuard('len', true);
    const gm = new InsensitiveGuardMaster(tg, lg, pg);
    const empty = {};
    expect(
      gm.check(meaninglessInput, meaninglessConfig, meaninglessCurPhase)
    ).toEqual(empty);
  });

  test('1개가 Invalid해서 throw함.', () => {
    const tg = new MockSubGuard('type', false); // invalid
    const pg = new MockSubGuard('phase', true);
    const lg = new MockSubGuard('len', true);
    const gm = new InsensitiveGuardMaster(tg, lg, pg);

    expect(
      gm.check(meaninglessInput, meaninglessConfig, meaninglessCurPhase)
    ).toEqual(
      expect.objectContaining({
        type: false,
      } as ValidationError)
    );
  });
});

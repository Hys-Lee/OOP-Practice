import LenGuard from '../classes/LenGuard';
import PhaseGuard from '../classes/PhaseGuard';
import TypeGuard from '../classes/TypeGuard';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import DefaultGameConfigDTO from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTOFactory from '../../../model/PitchingDTO/PitchingDTOFactory';
import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
} from '../../../model/PitchingDTO/PitchingDTOGuard';

describe('TypeGuard 객체 테스트', () => {
  const tg = new TypeGuard();
  test('validate테스트 - PitchingDTO 타입 체크 - Valid 상황', () => {
    const input = [1, 2, 3, 4];
    const testPitchingDTO = new PitchingDTO(input);
    const testResult = tg.validate(testPitchingDTO);
    expect(testResult).toEqual({ type: 'type', result: true });
  });
});

describe('LenGuard 객체 테스트', () => {
  const inputLen = 5;
  const config = new DefaultGameConfigDTO(1, inputLen);
  const lg = new LenGuard(config);
  const typePitchingDTOguard = new TypePitchingDTOGuard();
  const identityPitchingDTOguard = new IdentityNumberPitchingDTOGuard();
  test('validate테스트 - VALID: 입력 길이 체크', () => {
    const input = PitchingDTOFactory.createPitchingDTO(
      [1, 2, 3, 4, 5],
      typePitchingDTOguard,
      identityPitchingDTOguard
    );
    expect(lg.validate(input)).toEqual({ type: 'len', result: true });
  });
  test('validate테스트 - INVALID: 입력 길이 체크', () => {
    const input = PitchingDTOFactory.createPitchingDTO(
      [1, 2, 3, 4],
      typePitchingDTOguard,
      identityPitchingDTOguard
    );
    expect(lg.validate(input)).toEqual({ type: 'len', result: false });
  });
});

describe('PhaseGuard 객체 테스트', () => {
  const phase = 3;
  const config = new DefaultGameConfigDTO(phase, 0);
  const pg = new PhaseGuard(config);
});

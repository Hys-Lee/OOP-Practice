import { LenGuard, TypeGuard } from './SubGuard';
import PitchingDTO from '../model/PitchingDTO/PithcingDTO';
describe('TypeGuard 객체 테스트', () => {
  const tg = new TypeGuard();
  test('validate테스트 - PitchingDTO 타입 체크 - Valid 상황', () => {
    const input = [1, 2, 3, 4];
    const testPitchingDTO = new PitchingDTO(input);
    const testResult = tg.validate(testPitchingDTO);
    expect(testResult).toEqual({ type: 'type', result: true });
  });
  test('validate테스트 - PitchingDTO 타입 체크 - Valid 상황', () => {
    const input = { a: 3, b: 4 };
    // const testPitchingDTO = new PitchingDTO(input);
  });
});

describe('LenGuard 객체 테스트', () => {
  test('validate테스트 - 입력 길이 체크', () => {
    const inputLen = 5;
    const lg = new LenGuard(5);
  });
});
describe('PhaseGuard 객체 테스트', () => {});

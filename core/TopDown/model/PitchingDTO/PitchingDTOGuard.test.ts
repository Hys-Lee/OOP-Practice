/**
 * Guard만들 때, boolean으로 리턴하도록 했는데, 왜그랬을까 생각해봄.
 * 근데, throw를 Guard안에서 했다면, 정상일 때는 그냥 아무 리턴도 없어야 함.
 * 이거 test하기 불편하지 않을까 싶어서 그랬나봄.
 *
 * 만약에 에러일 때는 throw하고 정상일 때는 return boolean하는 것도 애매하자너.
 * 그렇다고 validator안에 PithcingDTO생성자를 넣기도 그렇고.
 */

import {
  TypePitchingDTOGuard,
  IdentityNumberPitchingDTOGuard,
} from './PitchingDTOGuard';

describe('TypePitchingDTOGuard 테스트', () => {
  const pg = new TypePitchingDTOGuard();
  test('validate 테스트 - Valid상황', () => {
    const input = [1, 2, 3];
    const result = pg.validate(input);
    expect(result).toBe(true);
  });
  test('validate 테스트 - Invalid상황 - 내부에 숫자 아닌게 있음.', () => {
    const input = [1, '2', 3];
    const result = pg.validate(input);
    expect(result).toBe(false);
  });
  test('validate 테스트 - Invalid상황 - 내부에 NaN 있음.', () => {
    const input = [1, NaN, 3];
    const result = pg.validate(input);
    expect(result).toBe(false);
  });
});

describe('IdentityPitchingDTOGuard 테스트', () => {
  test('validate 테스트 - Invalid한 상황 - 반복되는 값 존재', () => {
    const validator = new IdentityNumberPitchingDTOGuard();
    const input = [1, 1, 2, 3];
    const result = validator.validate(input);
    expect(result).toBe(false);
  });
  test('validate 테스트 - Valid한 상황 - 모두 유니크 값', () => {
    const validator = new IdentityNumberPitchingDTOGuard();
    const input = [1, 2, 3];
    const result = validator.validate(input);
    expect(result).toBe(true);
  });
});

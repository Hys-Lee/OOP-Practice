import ArrayPitchingDTO from '../../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import DefaultLenGuard from '../classes/DefaultLenGaurd';

describe('길이 가드 테스트', () => {
  const lg = new DefaultLenGuard();
  const len = 3;
  test('설정 길이가 맞을 때', () => {
    const input = new ArrayPitchingDTO([1, 2, 3]);
    const result = lg.validate(input, len);
    expect(result).toEqual({ len: true });
  });
  test('설정 길이가 틀릴 때', () => {
    const input = new ArrayPitchingDTO([1, 2]);
    const result = lg.validate(input, len);
    expect(result).toEqual({ len: false });
  });
});

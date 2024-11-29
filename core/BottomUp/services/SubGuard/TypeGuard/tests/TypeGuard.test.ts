import ArrayPitchingDTO from '../../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import DefaultTypeGaurd from '../classes/DefaultTypeGaurd';

describe('타입 가드 테스트: ', () => {
  const tg = new DefaultTypeGaurd();
  test('타입이 맞을 때 - ArrayPitchingDTO일 때', () => {
    const input = new ArrayPitchingDTO([1, 2, 3]);
    const result = tg.validate(input);
    expect(result).toEqual({ type: true });
  });
  test('타입이 안 맞을 때 - ArrayPitchingDTO가 아닐 때', () => {
    const input = {
      pitchingData: {
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      },
    } as PitchingDTO;
    const result = tg.validate(input);
    expect(result).toEqual({ type: false });
  });
});

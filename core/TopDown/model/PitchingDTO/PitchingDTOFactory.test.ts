import PitchingDTOFactory from './PitchingDTOFactory';
import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
} from './PitchingDTOGuard';
import PitchingDTO from './PithcingDTO';

describe('PitchingDTOFactory 테스트', () => {
  const typeDTOguard = new TypePitchingDTOGuard();
  const identityDTOguard = new IdentityNumberPitchingDTOGuard();
  test('팩토리 함수 테스트 - valid일 때 PitchingDTOFactory객체 생성', () => {
    const input = [1, 2, 3, 4];
    expect(
      PitchingDTOFactory.createPitchingDTO(
        input,
        typeDTOguard,
        identityDTOguard
      )
    ).toBeInstanceOf(PitchingDTO);
  });
  test('팩토리 함수 테스트 - invalid일 때 - 타입:  "DTO 생성 실패"에러 Throw', () => {
    const input = [1, 'asdf', 3];
    expect(() => {
      PitchingDTOFactory.createPitchingDTO(
        input,
        typeDTOguard,
        identityDTOguard
      );
    }).toThrow('DTO 생성 실패');
  });
  test('팩토리 함수 테스트 - invalid일 때 - 유일성:  "중복값 존재"에러 Throw', () => {
    const input = [1, 1, 3];
    expect(() => {
      PitchingDTOFactory.createPitchingDTO(
        input,
        typeDTOguard,
        identityDTOguard
      );
    }).toThrow('중복');
  });
});

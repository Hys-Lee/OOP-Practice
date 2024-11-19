import PitchingDTOFactory from './PitchingDTOFactory';
import PitchingDTO from './PithcingDTO';

describe('PitchingDTOFactory 테스트', () => {
  test('팩토리 함수 테스트 - valid일 때 PitchingDTOFactory객체 생성', () => {
    const input = [1, 2, 3, 4];
    expect(PitchingDTOFactory.createPitchingDTO(input)).toBeInstanceOf(
      PitchingDTO
    );
  });
  test('팩토리 함수 테스트 - invalid일 때 "DTO 생성 실패"에러 Throw', () => {
    const input = [1, 'asdf', 3];
    expect(() => {
      PitchingDTOFactory.createPitchingDTO(input);
    }).toThrow();
  });
});
import PitchingDTO from './PithcingDTO';
import PitchingDTOGuard from './PitchingDTOGuard';

class PitchingDTOFactory {
  static createPitchingDTO(input: any, validator = new PitchingDTOGuard()) {
    if (!validator.validate(input)) {
      throw new Error('DTO 생성 실패');
    }
    return new PitchingDTO(input);
  }
}

export default PitchingDTOFactory;

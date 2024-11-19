import PitchingDTO from './PithcingDTO';
import {
  TypePitchingDTOGuard,
  IdentityNumberPitchingDTOGuard,
} from './PitchingDTOGuard';

class PitchingDTOFactory {
  static _validate(input: any, typeGuard, identityGuard) {
    if (!typeGuard.validate(input)) {
      throw new Error('DTO 생성 실패');
    }

    if (!identityGuard.validate(input)) {
      throw new Error('중복값 존재');
    }
  }
  static createPitchingDTO(
    input: any,
    typeGuard = new TypePitchingDTOGuard(),
    identityGuard = new IdentityNumberPitchingDTOGuard()
  ) {
    this._validate(input, typeGuard, identityGuard);

    return new PitchingDTO(input);
  }
}

export default PitchingDTOFactory;

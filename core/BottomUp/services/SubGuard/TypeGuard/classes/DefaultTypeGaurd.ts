import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { TypeGuard } from '../interfaces/TypeGuard';
import { ValidationError } from '../../../../models/ValidationError/interfaces/ValidationError';
import ArrayPitchingDTO from '../../../../models/PitchingDTO/classes/ArrayPithcingDTO';
class DefaultTypeGaurd implements TypeGuard {
  private _validateArray(input: PitchingDTO) {
    return input instanceof ArrayPitchingDTO;
  }
  validate(input: PitchingDTO) {
    const result: boolean = this._validateArray(input);
    return { type: result };
  }
}

export default DefaultTypeGaurd;

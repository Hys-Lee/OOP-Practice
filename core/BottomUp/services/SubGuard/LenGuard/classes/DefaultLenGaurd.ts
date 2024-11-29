import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { LenGuard } from '../interfaces/LenGuard';

class DefaultLenGuard implements LenGuard {
  validate(input: PitchingDTO, len: number) {
    const result: boolean = input.pitchingData.length === len;
    return {
      len: result,
    };
  }
}

export default DefaultLenGuard;

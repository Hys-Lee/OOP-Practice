import {
  SubGuardForInput,
  SubGuardForInputAndNumber,
} from '../interfaces/SubGuard';
import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';

class LenGuard implements SubGuardForInputAndNumber {
  constructor() {}
  validate(input: PitchingDTO, len: number) {
    return { type: 'len', result: len === input.pitchingData.length };
  }
}
export default LenGuard;

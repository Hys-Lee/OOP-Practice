import { SubGuardForInput } from '../interfaces/SubGuard';
import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';

class LenGuard implements SubGuardForInput {
  private len: number;
  constructor(config: GameConfigDTO) {
    this.len = config.dataLen;
  }
  validate(input: PitchingDTO) {
    return { type: 'len', result: this.len === input.pitchingData.length };
  }
}
export default LenGuard;

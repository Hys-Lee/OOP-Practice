import GameConfigDTO from '../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from './DataTypes';

interface SubGuardForInput {
  validate: (input: PitchingDTO) => SubGuardResult;
}
interface SubGuardForNumber {
  validate: (input: number) => SubGuardResult;
}
// type SubGuard = SubGuardForInput | SubGuardForNumber;

class TypeGuard implements SubGuardForInput {
  constructor() {}
  validate(input: PitchingDTO) {
    return { type: 'type', result: input instanceof PitchingDTO };
  }
}

class LenGuard implements SubGuardForInput {
  private len: number;
  constructor(config: GameConfigDTO) {
    this.len = config.dataLen;
  }
  validate(input: PitchingDTO) {
    return { type: 'len', result: this.len === input.pitchingData.length };
  }
}

class PhaseGuard implements SubGuardForNumber {
  private configPhase: number;
  constructor(config: GameConfigDTO) {
    this.configPhase = config.phase;
  }
  validate(curPhase: number) {
    return { type: 'phase', result: this.configPhase >= curPhase };
  }
}

export { SubGuardForInput, SubGuardForNumber };
export { TypeGuard, LenGuard, PhaseGuard };

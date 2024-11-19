import PitchingDTO from '../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from './DataTypes';

interface SubGuard {
  validate: (input: PitchingDTO) => SubGuardResult;
}

class TypeGuard implements SubGuard {
  constructor() {}
  validate(input: PitchingDTO) {
    return { type: 'type', result: input instanceof PitchingDTO };
  }
}

class LenGuard implements SubGuard {
  private len;
  constructor(len: number) {
    this.len = len;
  }
  validate(input: PitchingDTO) {
    return { type: 'len', result: this.len === input.pitchingData.length };
  }
}

class PhaseGuard implements SubGuard {
  private configPhase;
  constructor(configPhase: number) {
    this.configPhase = configPhase;
  }
  validate(curPhase) {
    return { type: 'phase', result: this.configPhase >= curPhase };
  }
}

export { SubGuard };
export { TypeGuard, LenGuard, PhaseGuard };

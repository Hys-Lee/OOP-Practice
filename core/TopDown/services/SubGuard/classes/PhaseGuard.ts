import { SubGuardForNumber } from '../interfaces/SubGuard';
import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';

class PhaseGuard implements SubGuardForNumber {
  constructor() {}
  validate(maxPhase: number, curPhase: number) {
    return { type: 'phase', result: maxPhase >= curPhase };
  }
}

export default PhaseGuard;

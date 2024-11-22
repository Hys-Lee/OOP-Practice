import { SubGuardForNumber } from '../interfaces/SubGuard';
import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';

class PhaseGuard implements SubGuardForNumber {
  private configPhase: number;
  constructor(config: GameConfigDTO) {
    this.configPhase = config.phase;
  }
  validate(curPhase: number) {
    return { type: 'phase', result: this.configPhase >= curPhase };
  }
}

export default PhaseGuard;

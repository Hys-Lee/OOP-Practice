import { GameConfigDTO } from '../../../models/GameConfigDTO/interfaces/GameConfigDTO';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import { ValidationError } from '../../../models/ValidationError/interfaces/ValidationError';

interface GuardMaster {
  check: (
    input: PitchingDTO,
    config: GameConfigDTO,
    curPhase: number
  ) => ValidationError;
}

export { GuardMaster };

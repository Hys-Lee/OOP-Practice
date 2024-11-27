import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';

interface Guard {
  validate: (
    input: PitchingDTO,
    len: number,
    maxPhase: number,
    curPhase: number
  ) => string[];
}

export { Guard };

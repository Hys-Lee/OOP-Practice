import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';

interface Guard {
  validate: (input: PitchingDTO, config: GameConfigDTO) => string[];
}

export { Guard };

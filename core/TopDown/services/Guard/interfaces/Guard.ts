import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';

interface Guard {
  validate: (input: PitchingDTO, config: GameConfigDTO) => void;
}

export { Guard };

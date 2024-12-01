import { GameConfigDTO } from '../../../models/GameConfigDTO/interfaces/GameConfigDTO';
import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';

interface GameMaster {
  getResult: (input: PitchingDTO) => GameResultDTO;
}

export { GameMaster };

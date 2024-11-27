import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { PitchingResult } from '../../DataTypes';
interface Game {
  proceed: (input: PitchingDTO) => PitchingResult;
  getConfigPhase: () => number;
}
export { Game };

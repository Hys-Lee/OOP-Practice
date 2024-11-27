import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { PitchingResult } from '../../DataTypes';
interface Game {
  proceed: (input: PitchingDTO, curPhase: number) => PitchingResult;
  getConfigPhase: () => number;
}
export { Game };

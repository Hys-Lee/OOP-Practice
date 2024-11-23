import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { PitchingResult } from '../../DataTypes';

interface Referee {
  judge: (input: PitchingDTO, answer: PitchingDTO) => PitchingResult;
}

export { Referee };

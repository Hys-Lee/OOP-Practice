import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';

interface SubGuardForInput {
  validate: (input: PitchingDTO) => SubGuardResult;
}
interface SubGuardForNumber {
  validate: (input: number) => SubGuardResult;
}
// type SubGuard = SubGuardForInput | SubGuardForNumber;

export { SubGuardForInput, SubGuardForNumber };

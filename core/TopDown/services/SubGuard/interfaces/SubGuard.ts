import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';

interface SubGuardForInput {
  validate: (input: PitchingDTO) => SubGuardResult;
}
interface SubGuardForInputAndNumber {
  validate: (input: PitchingDTO, number: number) => SubGuardResult;
}
interface SubGuardForNumber {
  validate: (answer: number, input: number) => SubGuardResult;
}
// type SubGuard = SubGuardForInput | SubGuardForNumber;

export { SubGuardForInput, SubGuardForInputAndNumber, SubGuardForNumber };

import { SubGuardForInput } from '../interfaces/SubGuard';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
class TypeGuard implements SubGuardForInput {
  constructor() {}
  validate(input: PitchingDTO) {
    return { type: 'type', result: input instanceof PitchingDTO };
  }
}

export default TypeGuard;

import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { ValidationError } from '../../../../models/ValidationError/interfaces/ValidationError';

interface LenGuard {
  validate: (input: PitchingDTO, len: number) => ValidationError;
}

export { LenGuard };

import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';
import { ValidationError } from '../../../../models/ValidationError/interfaces/ValidationError';

interface TypeGuard {
  validate: (input: PitchingDTO) => ValidationError;
}

export { TypeGuard };

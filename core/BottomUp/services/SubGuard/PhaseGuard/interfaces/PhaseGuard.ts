import { ValidationError } from '../../../../models/ValidationError/interfaces/ValidationError';

interface PhaseGuard {
  validate: (curPhase: number, configPhase: number) => ValidationError;
}
export { PhaseGuard };

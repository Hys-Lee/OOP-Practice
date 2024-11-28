import { ValidationError } from '../../ValidationError/interfaces/ValidationError';

interface GameErrorDTO {
  continuable: boolean;
  detail: ValidationError;
}

export { GameErrorDTO };

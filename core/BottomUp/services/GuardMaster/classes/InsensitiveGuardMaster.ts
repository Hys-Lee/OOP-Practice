import { GameConfigDTO } from '../../../models/GameConfigDTO/interfaces/GameConfigDTO';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import ValidationTypes from '../../../models/RuleTerms/Validation/types/ValidationTypes';
import { ValidationError } from '../../../models/ValidationError/interfaces/ValidationError';
import { LenGuard } from '../../SubGuard/LenGuard/interfaces/LenGuard';
import { PhaseGuard } from '../../SubGuard/PhaseGuard/interfaces/PhaseGuard';
import { TypeGuard } from '../../SubGuard/TypeGuard/interfaces/TypeGuard';
import { GuardMaster } from '../interfaces/GuardMaster';

class InsensitiveGuardMaster implements GuardMaster {
  private typeGuard: TypeGuard;
  private lenGuard: LenGuard;
  private phaseGuard: PhaseGuard;
  constructor(
    typeGuard: TypeGuard,
    lenGuard: LenGuard,
    phaseGuard: PhaseGuard
  ) {
    this.typeGuard = typeGuard;
    this.lenGuard = lenGuard;
    this.phaseGuard = phaseGuard;
  }
  private _leaveInvalidates(validationError: ValidationError) {
    const invalidateTypes = Object.keys(validationError).filter(
      (type) => !validationError[type]
    );

    const invalidatesError = invalidateTypes.reduce(
      (acc, type) => ({ ...acc, [type]: false }),
      {} as ValidationError
    );

    return invalidatesError;
  }

  check(input: PitchingDTO, config: GameConfigDTO, curPhase: number) {
    const validationResults: ValidationError = {
      ...this.typeGuard.validate(input),
      ...this.lenGuard.validate(input, config.dataLen),
      ...this.phaseGuard.validate(curPhase, config.phase),
    };

    const invalidatesError = this._leaveInvalidates(validationResults);

    return invalidatesError;
  }
}
export default InsensitiveGuardMaster;

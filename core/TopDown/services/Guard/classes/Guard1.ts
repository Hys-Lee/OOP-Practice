import GameConfigDTO from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';
import {
  SubGuardForInput,
  SubGuardForInputAndNumber,
  SubGuardForNumber,
} from '../../SubGuard/interfaces/SubGuard';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';

class Guard1 {
  private _typeGuard: SubGuardForInput;
  private _lenGuard: SubGuardForInputAndNumber;
  private _phaseGuard: SubGuardForNumber;
  constructor(
    typeGuard: SubGuardForInput,
    lenGuard: SubGuardForInputAndNumber,
    phaseGuard: SubGuardForNumber
  ) {
    this._typeGuard = typeGuard;
    this._lenGuard = lenGuard;
    this._phaseGuard = phaseGuard;
  }

  validate(
    input: PitchingDTO,
    len: number,
    maxPhase: number,
    curPhase: number
  ) {
    const validationRes: SubGuardResult[] = [
      this._typeGuard.validate(input),
      this._lenGuard.validate(input, len),
      this._phaseGuard.validate(maxPhase, curPhase),
    ];

    const invalidTypes = validationRes
      .filter((res) => !res.result)
      .map((subGuardRes) => subGuardRes.type);

    return invalidTypes;
  }
}
export default Guard1;

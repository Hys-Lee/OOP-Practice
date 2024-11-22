import GameConfigDTO from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { SubGuardResult } from '../../DataTypes';
import {
  SubGuardForInput,
  SubGuardForNumber,
} from '../../SubGuard/interfaces/SubGuard';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';

class Guard1 {
  private _typeGuard: SubGuardForInput;
  private _lenGuard: SubGuardForInput;
  private _phaseGuard: SubGuardForNumber;
  private _curPhase: number;
  constructor(
    typeGuard: SubGuardForInput,
    lenGuard: SubGuardForInput,
    phaseGuard: SubGuardForNumber,
    curPhase: number
  ) {
    this._typeGuard = typeGuard;
    this._lenGuard = lenGuard;
    this._phaseGuard = phaseGuard;
    this._curPhase = curPhase;
  }

  validate(input: PitchingDTO, config: GameConfigDTO) {
    const validationRes: SubGuardResult[] = [
      this._typeGuard.validate(input),
      this._lenGuard.validate(input),
      this._phaseGuard.validate(this._curPhase),
    ];

    const invalidTypes = validationRes.filter((res) => !res.result);
    if (invalidTypes.length > 0) {
      const reasons = invalidTypes.map(({ type }) => type);
      throw new GameErrorDTO(reasons);
    }
  }
}
export default Guard1;

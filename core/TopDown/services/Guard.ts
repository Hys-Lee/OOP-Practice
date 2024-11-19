import GameConfigDTO from '../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../model/PitchingDTO/PithcingDTO';
import { SubGuard } from './SubGuard';

interface Guard {
  validate: (input: PitchingDTO, config: GameConfigDTO) => void;
}

class Guard1 {
  private _subGuards: SubGuard[];
  constructor(subGurads: SubGuard[]) {
    this._subGuards = subGurads;
  }
  validate(input: PitchingDTO, config: GameConfigDTO) {}
}

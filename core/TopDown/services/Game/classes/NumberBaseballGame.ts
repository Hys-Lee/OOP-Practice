import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { Guard } from '../../Guard/interfaces/Guard';
import { Referee } from '../../Referee/interfaces/Referee';
import { SubGuardResult } from '../../DataTypes';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';
import { Game } from '../interfaces/Game';

class NumberBaseballGame implements Game {
  private config: GameConfigDTO;
  private guard: Guard;
  private referee: Referee;
  private answer: PitchingDTO;

  constructor(
    config: GameConfigDTO,
    guard: Guard,
    referee: Referee,
    answer: PitchingDTO
  ) {
    this.config = config;
    this.guard = guard;
    this.referee = referee;
    this.answer = answer;
  }

  private _validate(input: PitchingDTO) {
    const invalidTypes: string[] = this.guard.validate(input, this.config);

    if (invalidTypes.length > 0) {
      throw new GameErrorDTO(invalidTypes);
    }
  }
  private _judge(input: PitchingDTO) {
    return this.referee.judge(input, this.answer);
  }

  proceed(input: PitchingDTO) {
    this._validate(input);

    const result = this._judge(input);

    return result;
  }
  getConfigPhase() {
    return this.config.phase;
  }
}

export default NumberBaseballGame;

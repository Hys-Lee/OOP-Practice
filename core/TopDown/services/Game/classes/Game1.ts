import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import RandomAnswerMaker from '../../AnswerMaker/classes/RandomAnswerMaker';
import Guard1 from '../../Guard/classes/Guard1';
import { Guard } from '../../Guard/interfaces/Guard';
import { Referee } from '../../Referee/interfaces/Referee';

const DEFAULT_GAME_PHASE = 10;
const DEFAULT_GAME_LEN = 3;

class Game1 {
  private config: GameConfigDTO;
  private guard: Guard;
  private referee: Referee;
  private answer: PitchingDTO;
  private curPhase: number;

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
    this.curPhase = 0;
  }

  private _validate(input: PitchingDTO) {
    this.guard.validate(input, this.config);
  }
  private _judge() {}

  proceed(input: PitchingDTO) {
    this._validate(input);
    this._judge();
  }
}

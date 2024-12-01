import { GameConfigDTO } from '../../../models/GameConfigDTO/interfaces/GameConfigDTO';
import DefaultGameErrorDTO from '../../../models/GameErrorDTO/classes/DefaultGameErrorDTO';
import DefaultGameResultDTO from '../../../models/GameResultDTO/classes/DefaultGameResultDTO';
import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { JudgeConclusion } from '../../../models/JudgeConclusion/interfaces/JudegeConclusion';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import { ValidationError } from '../../../models/ValidationError/interfaces/ValidationError';
import { GuardMaster } from '../../GuardMaster/interfaces/GuardMaster';
import { RefereeMasters } from '../../RefereeMaster/interfaces/RefereeMaster';
import { GameMaster } from '../interfaces/GameMaster';

class PitchingGameMaster implements GameMaster {
  private refereeMaster: RefereeMasters;
  private guardMaster: GuardMaster;
  private answer: PitchingDTO;
  private config: GameConfigDTO;
  private curPhase: number;
  constructor(
    refereeMaster: RefereeMasters,
    guardMaster: GuardMaster,
    answer: PitchingDTO,
    config: GameConfigDTO
  ) {
    this.refereeMaster = refereeMaster;
    this.guardMaster = guardMaster;
    this.answer = answer;
    this.config = config;
    this.curPhase = 0;
  }
  private _validate(input: PitchingDTO) {
    const invalidatesError = this.guardMaster.check(
      input,
      this.config,
      this.curPhase
    );

    const hasError = Object.keys(invalidatesError).length > 0;

    if (hasError) {
      const continuable = Object.keys(invalidatesError).includes('phase')
        ? false
        : true;

      throw new DefaultGameErrorDTO(continuable, invalidatesError);
    }
  }
  private _judge(input: PitchingDTO) {
    return this.refereeMaster.result(input, this.answer, this.config.dataLen);
  }

  getResult(input: PitchingDTO) {
    this.curPhase += 1;
    const remainPhase = this.config.phase - this.curPhase;

    this._validate(input);
    const gameResult: JudgeConclusion = this._judge(input);

    return new DefaultGameResultDTO(
      gameResult.isSuccess,
      gameResult.detailResult,
      remainPhase
    );
  }
}

export default PitchingGameMaster;

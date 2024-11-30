import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { JudgeConclusion } from '../../../models/JudgeConclusion/interfaces/JudegeConclusion';
import { JudgeResult } from '../../../models/JudgeResult/interfaces/JudgeResult';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import SubReferee from '../../SubReferee/types/SubReferee';

interface RefereeMasters {
  result: (
    input: PitchingDTO,
    answer: PitchingDTO,
    determinateSubReferees: SubReferee[],
    determinateRefereeClasses: (new () => SubReferee)[],
    indeterminateSubReferees: SubReferee[],
    indeterminateRefereeClasses: (new () => SubReferee)[]
  ) => JudgeConclusion;
}

export { RefereeMasters };

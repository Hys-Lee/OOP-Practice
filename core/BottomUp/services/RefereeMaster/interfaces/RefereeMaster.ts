import { GameResultDTO } from '../../../models/GameResultDTO/interfaces/GameResultDTO';
import { JudgeConclusion } from '../../../models/JudgeConclusion/interfaces/JudegeConclusion';
import { JudgeResult } from '../../../models/JudgeResult/types/JudgeResult';
import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';
import SubReferee from '../../SubReferee/types/SubReferee';

interface RefereeMasters {
  result: (
    input: PitchingDTO,
    answer: PitchingDTO,
    dataLen: number
  ) => JudgeConclusion;
}

export { RefereeMasters };

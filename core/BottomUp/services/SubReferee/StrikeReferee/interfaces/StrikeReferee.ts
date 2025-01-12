import { JudgeResult } from '../../../../models/JudgeResult/types/JudgeResult';
import { PitchingDTO } from '../../../../models/PitchingDTO/interfaces/PitchingDTO';

interface StrikeReferee {
  judge: (input: PitchingDTO, answer: PitchingDTO) => JudgeResult;
}

export { StrikeReferee };

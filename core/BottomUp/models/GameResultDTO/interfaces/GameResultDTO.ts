import { JudgeResult } from '../../JudgeResult/types/JudgeResult';

interface GameResultDTO {
  isSuccess: boolean;
  detailResult: JudgeResult;
  remainPhase: number;
}
export { GameResultDTO };

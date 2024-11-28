import { JudgeResult } from '../../JudgeResult/interfaces/JudgeResult';

interface GameResultDTO {
  isSuccess: boolean;
  detailResult: JudgeResult;
  remainPhase: number;
}
export { GameResultDTO };

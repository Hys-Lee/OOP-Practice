import { JudgeResult } from '../../JudgeResult/types/JudgeResult';
interface JudgeConclusion {
  isSuccess: boolean;
  detailResult: JudgeResult;
}

export { JudgeConclusion };

import JudgeTypes from '../../RuleTerms/Judgement/types/JudgeTypes';

// interface JudgeResult {
//   [key: JudgeTypes]: number;
// }

type JudgeResult = {
  [key in JudgeTypes]?: number;
};

export { JudgeResult };

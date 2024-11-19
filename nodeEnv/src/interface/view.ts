import { GameResultI, RefereeResultT } from '../../../core/atFirst/types';
const GREETING_COMMENT = `게임을 시작합니다.`;
// const CONFIG_GUIDE = `게임 설정을 해주세요`;
const GET_INPUT = `값들을 입력해주세요`;
const RESULT_TRANSLATING_MAP = {
  strike: '스트라이크',
  ball: '볼',
};
const PROCESS_GAME = (translatedResult) => `
주어진 입력으로 게임을 진행합니다.
----------------------------------
[중간 결과]
${translatedResult}

계속하시려면, 다시 입력해주세요.
`;

const ERROR_COMMENT_NOT_END = `다시 입력해주세요`;
const ERROR_COMMENT_END = `게임을 종료합니다`;
const ERROR_COMMENT_TYPE_MAP = {
  type: '형식이 맞지 않습니다.',
  len: '입력 길이가 맞지 않습니다.',
  phase: '설정된 페이즈를 넘어섰습니다.',
};

const startGame = () => {
  console.log(GREETING_COMMENT);
  console.log(GET_INPUT);
};
const _translateGameResult = (result: RefereeResultT) => {
  const goals = Object.keys(result);
  //test
  console.log('GOALS: ', goals, result);
  const resultString = goals.reduce((acc, cur) => {
    if (!Object.keys(RESULT_TRANSLATING_MAP).includes(cur)) return acc;

    const translatedGoal = RESULT_TRANSLATING_MAP[cur];
    //test
    console.log('translatedGoal: ', translatedGoal);

    return `${acc}\n${translatedGoal}: ${result[cur]}`;
  }, ``);

  return resultString;
};
const processGame = (phaseResult: GameResultI) => {
  const { result, end, phase } = phaseResult;
  console.log('phase:', phaseResult);
  const translatedResult = _translateGameResult(result);
  //test
  console.log('TRANLATEDRESULT: ', translatedResult);
  console.log(PROCESS_GAME(translatedResult));
};

const errorHandling = (error) => {
  let comment = ``;
  //test
  console.log('ERROR: ', error);
  if (error.type) {
    comment += ERROR_COMMENT_TYPE_MAP[error.type] + '\n';
  }

  if (error.end) {
    comment += ERROR_COMMENT_END;
  } else {
    comment += ERROR_COMMENT_NOT_END;
  }

  return comment;
};

const Viewer = (game) => {
  try {
    const result = game.process();
    processGame(result);
  } catch (error) {
    console.log(errorHandling(error));
  }
};

export default Viewer;
export { startGame };

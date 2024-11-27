// 여기에 Game을 GameController에 넣는 동작을 만들어두자.
// 외부에서 controller사용할 때는, 어떤 게임 넣을지 직접 안하고,
//  메서드만 사용해서 실행시키기 위해.

import DefaultGameConfigDTO from '../../model/ConfigDTO/GameConfigDTO';
import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
} from '../../model/PitchingDTO/PitchingDTOGuard';
import RandomAnswerMaker from '../../services/AnswerMaker/classes/RandomAnswerMaker';
import NumberBaseballGame from '../../services/Game/classes/NumberBaseballGame';
import Guard1 from '../../services/Guard/classes/Guard1';
import Referee1 from '../../services/Referee/classes/Referee1';
import LenGuard from '../../services/SubGuard/classes/LenGuard';
import PhaseGuard from '../../services/SubGuard/classes/PhaseGuard';
import TypeGuard from '../../services/SubGuard/classes/TypeGuard';
import BallReferee from '../../services/SubReferee/classes/BallReferee';
import StrikeReferee from '../../services/SubReferee/classes/StrikeReferee';
import DefaultGameController from './classes/DefaultGameController';

// 게임에 필요한 설정들

const _makeConfig = () => {
  const DEFAULT_PHASE = 3;
  const DEFAULT_LEN = 3;
  const defaultNumberBaseballGameConfig = new DefaultGameConfigDTO(
    DEFAULT_PHASE,
    DEFAULT_LEN
  );
  return defaultNumberBaseballGameConfig;
};
const _makeGuard = () => {
  const typeGuard = new TypeGuard();
  const lenGuard = new LenGuard();
  const phaseGuard = new PhaseGuard();
  return new Guard1(typeGuard, lenGuard, phaseGuard);
};
const _makeReferee = () => {
  const strikeReferee = new StrikeReferee();
  const ballReferee = new BallReferee();
  return new Referee1([strikeReferee, ballReferee]);
};
const _makeAnswer = (answerLen: number) => {
  const typePitchingDTOguard = new TypePitchingDTOGuard();
  const identityPitchingDTOguard = new IdentityNumberPitchingDTOGuard();
  const answerMaker = new RandomAnswerMaker(
    typePitchingDTOguard,
    identityPitchingDTOguard
  );
  return answerMaker.makeAnswer(answerLen);
};

// 게임 생성

const _makeGame = () => {
  const config = _makeConfig();
  const guard = _makeGuard();
  const referee = _makeReferee();
  const answer = _makeAnswer(config.dataLen);

  return new NumberBaseballGame(config, guard, referee, answer);
};
const numberBaseballGame = _makeGame();

// 컨트롤러 생성

const gameController = new DefaultGameController(numberBaseballGame);

export default gameController;

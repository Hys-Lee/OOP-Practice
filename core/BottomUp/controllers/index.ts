import DefaultGameConfigDTO from '../models/GameConfigDTO/classes/DefaultGameConfigDTO';
import { GameConfigDTO } from '../models/GameConfigDTO/interfaces/GameConfigDTO';
import DefaultGameResultDTO from '../models/GameResultDTO/classes/DefaultGameResultDTO';
import { GameResultDTO } from '../models/GameResultDTO/interfaces/GameResultDTO';
import ArrayPitchingDTO from '../models/PitchingDTO/classes/ArrayPithcingDTO';
import { PitchingDTO } from '../models/PitchingDTO/interfaces/PitchingDTO';
import RandomAnswerMaker from '../services/AnswerMaker/classes/RandomAnswerMaker';
import PitchingGameMaster from '../services/GameMaster/classes/PitchingGameMaster';
import { GameMaster } from '../services/GameMaster/interfaces/GameMaster';
import InsensitiveGuardMaster from '../services/GuardMaster/classes/InsensitiveGuardMaster';
import { GuardMaster } from '../services/GuardMaster/interfaces/GuardMaster';
import DistinguisingRefereeMaster from '../services/RefereeMaster/classes/DistinguisingRefereeMaster';
import { RefereeMasters } from '../services/RefereeMaster/interfaces/RefereeMaster';
import DefaultLenGuard from '../services/SubGuard/LenGuard/classes/DefaultLenGaurd';
import DefaultPhaseGuard from '../services/SubGuard/PhaseGuard/classes/DefaultPhaseGuard';
import DefaultTypeGaurd from '../services/SubGuard/TypeGuard/classes/DefaultTypeGaurd';
import DefaultBallReferee from '../services/SubReferee/BallRefree/classes/DefaultBallReferee';
import DefaultStrikeReferee from '../services/SubReferee/StrikeReferee/classes/DefaultStrikeReferee';
import DefaultGameController from './classes/DefaultGameController';
import { GameController } from './interfaces/GameController';

function _makeDefaultDistinguishingRefereeMaster() {
  const strikeReferee = new DefaultStrikeReferee();
  const ballReferee = new DefaultBallReferee();
  return new DistinguisingRefereeMaster([strikeReferee], [ballReferee]);
}
function _makeInsensitiveGuardMaster() {
  const typeguard = new DefaultTypeGaurd();
  const lengaurd = new DefaultLenGuard();
  const phaseGuard = new DefaultPhaseGuard();

  return new InsensitiveGuardMaster(typeguard, lengaurd, phaseGuard);
}
function _makeConfig() {
  const DEFAULT_PHASE = 10;
  const DEFAULT_DATALEN = 3;
  return new DefaultGameConfigDTO(DEFAULT_PHASE, DEFAULT_DATALEN);
}
function _makeAnswer(datalen: number) {
  const answerMaker = new RandomAnswerMaker();
  return answerMaker.makeAnswer(datalen);
}
function _makeGameMaster(config: GameConfigDTO = _makeConfig()) {
  const defaultRefereeMaster: RefereeMasters =
    _makeDefaultDistinguishingRefereeMaster();
  const defaultGuardMaster: GuardMaster = _makeInsensitiveGuardMaster();
  const answer = _makeAnswer(config.dataLen);
  const gameMaster = new PitchingGameMaster(
    defaultRefereeMaster,
    defaultGuardMaster,
    answer,
    config
  );
  return gameMaster;
}
const initCustomGame = (gameMaster: GameMaster) => {
  const gameController = new DefaultGameController(gameMaster);
  return gameController;
};

/**
 *
 * @param config
 * @returns {Object}
 * @property {Function} gameRun
 */
const initPithicngGame = (config: GameConfigDTO = _makeConfig()) => {
  const gameMaster: GameMaster = _makeGameMaster(config);
  const gameController = new DefaultGameController(gameMaster);
  const restartGame = (config: GameConfigDTO) => {
    const newGM = _makeGameMaster(config);
    return new DefaultGameController(newGM);
  };
  /**
   * gameRun 설명
   * @param input number[]
   * @returns { isSuccess: boolean;  detailResult: {strike:number, ball:number};  remainPhase: number;}
   */
  const gameRun = (input: number[]) => {
    const pitchingInput = new ArrayPitchingDTO(input);
    return gameController.run(pitchingInput);
  };
  return {
    gameRun,
    restartGame,
    end: gameController.end,
    getLastestResult: gameController.getLastestResult,
  };
};

export { initPithicngGame };

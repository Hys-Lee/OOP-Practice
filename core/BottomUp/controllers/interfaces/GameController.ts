import { GameConfigDTO } from '../../models/GameConfigDTO/interfaces/GameConfigDTO';
import { GameResultDTO } from '../../models/GameResultDTO/interfaces/GameResultDTO';
import { PitchingDTO } from '../../models/PitchingDTO/interfaces/PitchingDTO';
import { AnswerMaker } from '../../services/AnswerMaker/interfaces/AnswerMaker';
import { GameMaster } from '../../services/GameMaster/interfaces/GameMaster';

interface GameController {
  //   constructor (gameMaster:GameMaster) ;
  run: (input: PitchingDTO) => GameResultDTO; // 게임 마스터에게 진행 명령.
  end: () => void; // 역시 게임 마스터의 상태를 처리.
  getLastestResult: () => GameResultDTO;
}

export { GameController };

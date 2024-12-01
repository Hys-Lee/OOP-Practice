import DefaultGameErrorDTO from '../../models/GameErrorDTO/classes/DefaultGameErrorDTO';
import { GameResultDTO } from '../../models/GameResultDTO/interfaces/GameResultDTO';
import { PitchingDTO } from '../../models/PitchingDTO/interfaces/PitchingDTO';
import { GameMaster } from '../../services/GameMaster/interfaces/GameMaster';
import { GameController } from '../interfaces/GameController';

class DefaultGameController implements GameController {
  private gameMaster: GameMaster;
  private lastestResult: GameResultDTO;
  constructor(gameMaster: GameMaster) {
    this.gameMaster = gameMaster;
    this.lastestResult = null;
  }
  private _errorHandle(error: DefaultGameErrorDTO) {
    if (!error.continuable) {
      this.end();
    }
    throw error;
  }
  private _handleGameResult(gameResult: GameResultDTO) {
    this.lastestResult = gameResult;

    if (gameResult.isSuccess) this.gameMaster = null;

    return gameResult;
  }
  run(input: PitchingDTO) {
    try {
      if (!this.gameMaster) throw new Error('게임이 종료되었습니다');

      const result = this.gameMaster.getResult(input);

      return this._handleGameResult(result);
    } catch (error: unknown) {
      if (error instanceof DefaultGameErrorDTO) {
        this._errorHandle(error);

        return;
      }
      console.error(error);
      throw error;
    }
  }
  end() {
    this.gameMaster = null;
  }
  getLastestResult() {
    return this.lastestResult;
  }
}

export default DefaultGameController;

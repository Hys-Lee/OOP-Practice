import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';
import GameResultDTO from '../../../model/Game/GameResultDTO';
import PitchingDTOFactory from '../../../model/PitchingDTO/PitchingDTOFactory';
import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
} from '../../../model/PitchingDTO/PitchingDTOGuard';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import { PitchingResult } from '../../../services/DataTypes';
import NumberBaseballGame from '../../../services/Game/classes/NumberBaseballGame';
import { Game } from '../../../services/Game/interfaces/Game';
import { GameController } from '../interfaces/GameController';

class DefaultGameController implements GameController {
  private game: Game;
  private curPhase: number;
  private isEnd: boolean;
  private maxPhase: number;
  constructor(game: Game) {
    this.game = game;
    this.curPhase = 0;
    this.isEnd = false;
    this.maxPhase = this.game.getConfigPhase();
  }
  private _errorHandle(error: Error | GameErrorDTO, typeMessage: string) {
    const reasons =
      error instanceof GameErrorDTO ? error.reasons : [error.message];

    throw new GameErrorDTO(reasons, typeMessage);
  }
  private _convertPitchingResToGameRes(ptichingResult) {
    return new GameResultDTO({
      leftPhase: this.maxPhase - this.curPhase,
      isEnd: this.isEnd,
      pitchingResult: ptichingResult,
    });
  }
  private _convertInputToDTO(input: any) {
    const typePitchingDTOguard = new TypePitchingDTOGuard();
    const identityPitchingDTOguard = new IdentityNumberPitchingDTOGuard();

    try {
      const inputDTO = PitchingDTOFactory.createPitchingDTO(
        input,
        typePitchingDTOguard,
        identityPitchingDTOguard
      );
      return inputDTO;
    } catch (error) {
      this._errorHandle(error, `입력 값 에러`);
    }
  }

  private _proceedSupport(inputDTO: PitchingDTO) {
    if (!this.game)
      this._errorHandle(
        new Error('컨트롤러에 게임을 삽입해주세요'),
        '게임-컨트롤러 에러'
      );

    try {
      this.curPhase += 1;
      if (this.curPhase == this.maxPhase) {
        this.isEnd = true;
      }
      // else if (this.curPhase > this.maxPhase) {
      //   throw new Error('마지막 페이즈였습니다');
      // }

      const gameResult = this.game.proceed(inputDTO, this.curPhase);

      return gameResult;
    } catch (error) {
      this._errorHandle(error, '부적절한 게임 입력');
    }
  }

  proceed(input: any) {
    const inputDTO = this._convertInputToDTO(input);

    const pitchingResult = this._proceedSupport(inputDTO);

    return this._convertPitchingResToGameRes(pitchingResult);
  }
  reboot() {
    this.curPhase = 0;
    this.isEnd = false;

    return new GameResultDTO({
      leftPhase: this.maxPhase,
      isEnd: this.isEnd,
      pitchingResult: {
        strike: 0,
        ball: 0,
      } as PitchingResult,
    });
  }
  end() {
    // 초기화 해주기.
    this.isEnd = true;
    this.curPhase = 0;
    this.maxPhase = 0;
    this.game = null;
  }
}

export default DefaultGameController;

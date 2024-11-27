import { GameConfigDTO } from '../../../model/ConfigDTO/GameConfigDTO';
import GameResultDTO from '../../../model/Game/GameResultDTO';
import { Game } from '../../../services/Game/interfaces/Game';

interface GameController {
  proceed: (input: any) => GameResultDTO;
  reboot: () => void;
  end: () => void;
}
export { GameController };

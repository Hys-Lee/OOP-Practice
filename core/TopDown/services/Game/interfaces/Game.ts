import GameResultDTO from '../../../model/Game/GameResultDTO';

interface Game {
  proceed: (input: any) => GameResultDTO;
}
export { Game };

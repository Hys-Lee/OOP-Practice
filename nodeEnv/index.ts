import Viewer from './src/atFirst/view';
import { startGame } from './src/atFirst/view';
import Game from '../core/atFirst/Objects';
import inputHandler from './src/atFirst/input';
import NumberBaseballController, {
  CustomConfigGameController,
} from '../core/TopDown/controller/GameController/index';
import { initPithicngGame } from 'core/BottomUp/controllers';
import { GameResultDTO } from 'core/BottomUp/models/GameResultDTO/interfaces/GameResultDTO';

const atFirstOnLine = () => {
  // const referee = new Referee();
  // GREETING
  // const game = new Game();
  // inputHandler(line, game);
  // Viewer(game);
};
const topDownOnLine = (line: string) => {
  const gameController = NumberBaseballController;
  const convertInput = (lineString: string) => {
    return lineString.split(' ').map((val) => Number(val));
  };
  const inputNumArray = convertInput(line);
  const result = gameController.proceed(inputNumArray);
  console.log('line에 대한result: ', line, result);
};

const bottomUpOnLine = (
  line: string,
  gameRun: (input: number[]) => GameResultDTO
) => {
  const convertInput = (lineString: string) => {
    return lineString.split(' ').map((val) => Number(val));
  };
  const inputNumArray = convertInput(line);
  const result = gameRun(inputNumArray);
  console.log('line에 대한 result: ', line, result);
};

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

startGame();
const { gameRun, getLastestResult, restartGame, end } = initPithicngGame();
rl.on('line', (line: string) => {
  console.log('입력 종료야');
  // atFirstOnLine()
  // topDownOnLine(line);
  bottomUpOnLine(line, gameRun);
});

// rl.on('close', () => {
//   //   Viewer(game);
// });

import Viewer from './src/atFirst/view';
import { startGame } from './src/atFirst/view';
import Game from '../core/atFirst/Objects';
import inputHandler from './src/atFirst/input';
import NumberBaseballController, {
  CustomConfigGameController,
} from '../core/TopDown/controller/GameController/index';

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
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

startGame();
rl.on('line', (line: string) => {
  console.log('입력 종료야');
  // atFirstOnLine()
  topDownOnLine(line);
});

// rl.on('close', () => {
//   //   Viewer(game);
// });

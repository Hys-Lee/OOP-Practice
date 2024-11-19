import Viewer from './src/interface/view';
import { startGame } from './src/interface/view';
import Game from '../core/atFirst/Objects';
import inputHandler from './src/interface/input';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const referee = new Referee();
// GREETING
const game = new Game();
startGame();
rl.on('line', (line: string) => {
  console.log('입력 종료야');
  inputHandler(line, game);
  Viewer(game);
});

// rl.on('close', () => {
//   //   Viewer(game);
// });

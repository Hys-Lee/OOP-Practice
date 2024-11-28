import dd from '../../../core/TopDown/controller/GameController/index';

const endGame = dd.end;
const proceedGameWithInput = (input: number[]) => dd.proceed(input);
const rebootGame = dd.reboot;

export { endGame, proceedGameWithInput, rebootGame };

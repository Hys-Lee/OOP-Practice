// import Game from '../../../core/Objects';

const translateInput = (lineString: string) => {
  return lineString
    .trim()
    .split(' ')
    .map((val) => {
      console.log(val);
      return Number(val);
    });
};

export default function inputHandler(line, game) {
  //   const game = new Game();
  console.log(line);
  console.log(translateInput(line));
  game.input = translateInput(line);
}

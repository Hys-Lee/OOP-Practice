"use strict";
// import Game from '../../../core/Objects';
Object.defineProperty(exports, "__esModule", { value: true });
var translateInput = function (lineString) {
    return lineString
        .trim()
        .split(' ')
        .map(function (val) {
        console.log(val);
        return Number(val);
    });
};
function inputHandler(line, game) {
    //   const game = new Game();
    console.log(line);
    console.log(translateInput(line));
    game.input = translateInput(line);
}
exports.default = inputHandler;

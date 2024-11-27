"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./src/atFirst/view");
var index_1 = require("../core/TopDown/controller/GameController/index");
var atFirstOnLine = function () {
    // const referee = new Referee();
    // GREETING
    // const game = new Game();
    // inputHandler(line, game);
    // Viewer(game);
};
var topDownOnLine = function (line) {
    var gameController = index_1.default;
    var convertInput = function (lineString) {
        return lineString.split(' ').map(function (val) { return Number(val); });
    };
    var inputNumArray = convertInput(line);
    var result = gameController.proceed(inputNumArray);
    console.log('line에 대한result: ', line, result);
};
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
(0, view_1.startGame)();
rl.on('line', function (line) {
    console.log('입력 종료야');
    // atFirstOnLine()
    topDownOnLine(line);
});
// rl.on('close', () => {
//   //   Viewer(game);
// });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("./src/interface/view");
var view_2 = require("./src/interface/view");
var Objects_1 = require("../core/Objects");
var input_1 = require("./src/interface/input");
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// GREETING
var game = new Objects_1.default();
(0, view_2.startGame)();
rl.on('line', function (line) {
    console.log('입력 종료야');
    (0, input_1.default)(line, game);
    (0, view_1.default)(game);
});
// rl.on('close', () => {
//   //   Viewer(game);
// });

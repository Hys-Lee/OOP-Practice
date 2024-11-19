"use strict";
// Refree Logic
Object.defineProperty(exports, "__esModule", { value: true });
exports.phaseGuardLogic = exports.lenGuradLogic = exports.typeGuardLogic = exports.ballLogic = exports.strikeLogic = void 0;
var strikeLogic = function (_a) {
    var input = _a.input, answer = _a.answer;
    return input.filter(function (value, idx) { return answer[idx] === value; }); // answer랑 같은 위치에서 값이 같
};
exports.strikeLogic = strikeLogic;
var ballLogic = function (_a) {
    var input = _a.input, answer = _a.answer;
    return input.filter(function (value, idx) {
        return answer.find(function (answerV) { return answerV == value; }) && answer[idx] != value;
    } // 존재하나, 일치X
    );
};
exports.ballLogic = ballLogic;
// Guard Logic
var typeGuardLogic = function (_a) {
    var input = _a.input;
    console.log('typeg: ', input);
    if (!Array.isArray(input))
        return false;
    return input.every(function (number) { return !Number.isNaN(number) && Number.isInteger(number); });
};
exports.typeGuardLogic = typeGuardLogic;
var lenGuradLogic = function (_a) {
    var input = _a.input, answer = _a.answer;
    if (answer.length === input.length)
        return true;
    return false;
};
exports.lenGuradLogic = lenGuradLogic;
var phaseGuardLogic = function (_a) {
    var phase = _a.phase;
    if (phase > 3)
        return false;
    return true;
};
exports.phaseGuardLogic = phaseGuardLogic;

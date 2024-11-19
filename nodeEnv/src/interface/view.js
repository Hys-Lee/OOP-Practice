"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = void 0;
var GREETING_COMMENT = "\uAC8C\uC784\uC744 \uC2DC\uC791\uD569\uB2C8\uB2E4.";
// const CONFIG_GUIDE = `게임 설정을 해주세요`;
var GET_INPUT = "\uAC12\uB4E4\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694";
var RESULT_TRANSLATING_MAP = {
    strike: '스트라이크',
    ball: '볼',
};
var PROCESS_GAME = function (translatedResult) { return "\n\uC8FC\uC5B4\uC9C4 \uC785\uB825\uC73C\uB85C \uAC8C\uC784\uC744 \uC9C4\uD589\uD569\uB2C8\uB2E4.\n----------------------------------\n[\uC911\uAC04 \uACB0\uACFC]\n".concat(translatedResult, "\n\n\uACC4\uC18D\uD558\uC2DC\uB824\uBA74, \uB2E4\uC2DC \uC785\uB825\uD574\uC8FC\uC138\uC694.\n"); };
var ERROR_COMMENT_NOT_END = "\uB2E4\uC2DC \uC785\uB825\uD574\uC8FC\uC138\uC694";
var ERROR_COMMENT_END = "\uAC8C\uC784\uC744 \uC885\uB8CC\uD569\uB2C8\uB2E4";
var ERROR_COMMENT_TYPE_MAP = {
    type: '형식이 맞지 않습니다.',
    len: '입력 길이가 맞지 않습니다.',
    phase: '설정된 페이즈를 넘어섰습니다.',
};
var startGame = function () {
    console.log(GREETING_COMMENT);
    console.log(GET_INPUT);
};
exports.startGame = startGame;
var _translateGameResult = function (result) {
    var goals = Object.keys(result);
    //test
    console.log('GOALS: ', goals, result);
    var resultString = goals.reduce(function (acc, cur) {
        if (!Object.keys(RESULT_TRANSLATING_MAP).includes(cur))
            return acc;
        var translatedGoal = RESULT_TRANSLATING_MAP[cur];
        //test
        console.log('translatedGoal: ', translatedGoal);
        return "".concat(acc, "\n").concat(translatedGoal, ": ").concat(result[cur]);
    }, "");
    return resultString;
};
var processGame = function (phaseResult) {
    var result = phaseResult.result, end = phaseResult.end, phase = phaseResult.phase;
    console.log('phase:', phaseResult);
    var translatedResult = _translateGameResult(result);
    //test
    console.log('TRANLATEDRESULT: ', translatedResult);
    console.log(PROCESS_GAME(translatedResult));
};
var errorHandling = function (error) {
    var comment = "";
    //test
    console.log('ERROR: ', error);
    if (error.type) {
        comment += ERROR_COMMENT_TYPE_MAP[error.type] + '\n';
    }
    if (error.end) {
        comment += ERROR_COMMENT_END;
    }
    else {
        comment += ERROR_COMMENT_NOT_END;
    }
    return comment;
};
var Viewer = function (game) {
    try {
        var result = game.process();
        processGame(result);
    }
    catch (error) {
        console.log(errorHandling(error));
    }
};
exports.default = Viewer;

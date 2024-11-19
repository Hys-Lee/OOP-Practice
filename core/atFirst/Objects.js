"use strict";
// // DATA 타입 - 클래스모 만들지는 생각좀..(getter,setter만 있는..)
// interface DataType {}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// type JudgeKey='strike'|'ball';
// type JudgeValue = number;
// type Judge= {
//   judgeFor: JudgeKey;
//   value: JudgeValue;
// }
// interface JudgeResultInterface{
//     [judgeFor:JudgeKey]:JudgeValue
// }
// type RefreeLogic<T extends DataType> = (data: T) => Judge;
// // 객체 정의
// interface HeadRefereeInterface {
//   judgeResult: ;
// }
// class HeadReferee<T extends DataType> {
//   private pitches: T;
//   private subReferees: SubReferee<T>[];
//   constructor(pitches: T, subReferees: SubReferee<T>[]) {
//     this.pitches = pitches;
//     this.subReferees = subReferees;
//   }
//   get judgeResult() {
//     const result = {};
//     this.subReferees.forEach((subReferee) => {
//       const countInfo = subReferee.count;
//       result[countInfo.judgeFor] = countInfo.value;
//     });
//     return;
//   }
// }
// interface SubRefereeInterface<T extends Judge> {
//   count: T;
// }
// class SubReferee<S extends DataType> implements SubRefereeInterface<Judge> {
//   private logic: RefreeLogic<S>;
//   private pitches: S;
//   constructor(logic: RefreeLogic<S>, pitches: S) {
//     this.logic = logic;
//     this.pitches = pitches;
//   }
//   get count() {
//     return this.logic(this.pitches);
//   }
// }
var logic_1 = require("./logic");
// class Guard {
//   private input;
//   private answer;
//   private phase;
//   result;
//   constructor(input, answer, phase) {
//     this.input = input;
//     this.answer = answer;
//     this.phase = phase;
//   }
// }
/**
 * Logic을 밖으로 빼니까, subguard나 subreferee나 똑같길래, worker클래스 제작하기로 함.
 * 만들고보니 공통이라 클래스를 만둘면 안되ㄹ것 같은데..
 */
var Worker = /** @class */ (function () {
    function Worker(ingredients, logic) {
        this.ingredients = ingredients;
        this.logic = logic;
    }
    Object.defineProperty(Worker.prototype, "result", {
        get: function () {
            console.log('ingre: ', this.ingredients, this.logic, this.logic(this.ingredients));
            // console.log('재료,로직: ', this.ingredients, this.logic(this.ingredients));
            return this.logic(this.ingredients);
        },
        enumerable: false,
        configurable: true
    });
    return Worker;
}());
// class SubGuard {
//   private ingredients;
//   private logic;
//   constructor(logic, ingredients) {
//     this.ingredients = ingredients;
//     this.logic = logic;
//   }
//   get result() {
//     return this.logic(this.ingredients);
//   }
// }
var HeadGuard = /** @class */ (function () {
    function HeadGuard(_a) {
        var props = __rest(_a, []);
        // this.logics = [typeGuardLogic, lenGuradLogic, phaseGuardLogic];
        this.logicGoalMap = {
            type: logic_1.typeGuardLogic,
            len: logic_1.lenGuradLogic,
            phase: logic_1.phaseGuardLogic,
        };
        // // typeguard
        // this.typeGuradLogic = typeGuardLogic;
        // this.typeGuard = new subGuard(this.typeGuradLogic);
        // // lenguard
        // this.lenGuradLogic = lenGuradLogic;
        // this.lenGurad = new subGuard(this.lenGuradLogic);
        // // phasehuard
        // this.guards = this.logics.map(
        //   //   (logic) => new SubGuard(logic, { input, answer, phase })
        //   (logic) => new Worker<T>({ ...props }, logic)
        // );
        this.guards = Object.values(this.logicGoalMap).map(function (logic) { return new Worker(props, logic); });
    }
    HeadGuard.prototype.validate = function () {
        var _this = this;
        var results = Object.keys(this.logicGoalMap).map(function (goal, idx) {
            var matchedGuard = _this.guards[idx];
            return {
                goal: goal,
                result: matchedGuard.result,
            };
        });
        //test
        console.log('RESULT: ', results);
        var EndIfFalse = ['phase'];
        var invalidGoals = results
            .filter(function (_a) {
            var result = _a.result;
            return !result;
        })
            .map(function (_a) {
            var goal = _a.goal;
            return goal;
        });
        var end = !EndIfFalse.every(function (goal) { return !invalidGoals.includes(goal); }); // 모두 거짓이 아니면 == 하나라도 참이면.
        // const end = !EndIfFalse.every((goal) => !results[goal]); // 모두 거짓이 아니면 == 하나라도 참이면.
        // const types: GuardGoalsT[] = Object.keys(results).filter(
        //   (goal: GuardGoalsT) => !results[goal]
        // );
        var error = {
            end: end,
            types: invalidGoals, /// 슈발 개같음.
        };
        console.log('error.type:', error.types, error.types.length);
        if (error.types.length !== 0)
            throw error;
        return;
    };
    return HeadGuard;
}());
// class SubReferee {
//   private input;
//   private answer;
//   private logic;
//   constructor(input, answer, logic) {
//     this.input = input;
//     this.answer = answer;
//     this.logic = logic;
//   }
//   get result() {
//     return this.logic(this.input, this.answer);
//   }
// }
var HeadReferee = /** @class */ (function () {
    function HeadReferee(input, answer) {
        // this.strikeReferee = new SubReferee(input, answer, this.strikeLogic);
        // this.ballReferee = new SubReferee(input, answer, this.ballLogic);
        this.logicsAndGoals = [
            { logic: logic_1.strikeLogic, goal: 'strike' },
            { logic: logic_1.ballLogic, goal: 'ball' },
        ];
        this.referees = this.logicsAndGoals.map(function (_a) {
            var logic = _a.logic;
            return new Worker({ input: input, answer: answer }, logic);
        });
    }
    Object.defineProperty(HeadReferee.prototype, "result", {
        get: function () {
            var _this = this;
            return this.referees.reduce(function (acc, cur, idx) {
                var _a;
                var goal = _this.logicsAndGoals[idx].goal;
                //test
                console.log('cur.result: ', cur, cur.result);
                return __assign(__assign({}, acc), (_a = {}, _a[goal] = cur.result.length, _a));
            }, {});
        },
        enumerable: false,
        configurable: true
    });
    return HeadReferee;
}());
var Game = /** @class */ (function () {
    function Game(answer) {
        if (answer === void 0) { answer = new Questioner(3).answer; }
        // this.input = input;
        this.answer = answer;
        this.phase = 0;
        this.isEnd = false;
    }
    Game.prototype._validate = function () {
        var headGuard = new HeadGuard({
            input: this._input,
            answer: this.answer,
            phase: this.phase,
        });
        // const validity = headGuard.result;
        // if (!validity) throw {};
        headGuard.validate();
    };
    Game.prototype._judge = function () {
        console.log('this.input: ', this._input);
        var headReferee = new HeadReferee(this._input, this.answer);
        var phaseResult = headReferee.result;
        var returnTemplate = { result: phaseResult, phase: this.phase };
        if (phaseResult === 3) {
            this.isEnd = true;
        }
        return __assign({ end: this.isEnd }, returnTemplate);
    };
    Game.prototype.process = function () {
        this._validate();
        this.phase += 1;
        return this._judge();
    };
    Object.defineProperty(Game.prototype, "input", {
        set: function (newIinput) {
            this._input = newIinput;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
// interface GameControllerI {
//   input: DataT;
//   output: DataT;
// }
// class GameController {
//   private inputDevice;
//   private viewDevice;
//   private gameDevice;
//   constructor(inputDevice, viewDevice) {
//     this.inputDevice = inputDevice;
//     this.viewDevice = viewDevice;
//     this.gameDevice = new Game()
//   }
//   set input(){
//   }
// }
var Questioner = /** @class */ (function () {
    function Questioner(len) {
        this.len = len;
    }
    Questioner.prototype._makeRandomDigit = function () {
        return Math.floor(Math.random() * 9);
    };
    Object.defineProperty(Questioner.prototype, "answer", {
        get: function () {
            var result = [];
            for (var i = 0; i < this.len; i++) {
                result.push(this._makeRandomDigit());
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return Questioner;
}());
exports.default = Game;

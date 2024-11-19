// // DATA 타입 - 클래스모 만들지는 생각좀..(getter,setter만 있는..)
// interface DataType {}

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

import {
  strikeLogic,
  ballLogic,
  typeGuardLogic,
  lenGuradLogic,
  phaseGuardLogic,
} from './logic';

import {
  LogicResultT,
  WorkerI,
  HeadGuardLogicIngredientsI,
  GuardResultT,
  RefereeResultT,
  GuardGoalsT,
  LogicIngredientsI,
  RefereeGoalsT,
  GameI,
  DataT,
  HeadGuardI,
  HeadGuardErrorT,
} from './types';

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

class Worker<T> implements WorkerI<LogicResultT> {
  private ingredients: T;
  private logic: (ingre: T) => LogicResultT;
  constructor(ingredients: T, logic: (ingre: T) => LogicResultT) {
    this.ingredients = ingredients;
    this.logic = logic;
  }
  get result() {
    console.log(
      'ingre: ',
      this.ingredients,
      this.logic,
      this.logic(this.ingredients)
    );
    // console.log('재료,로직: ', this.ingredients, this.logic(this.ingredients));
    return this.logic(this.ingredients);
  }
}

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

class HeadGuard<T extends HeadGuardLogicIngredientsI> implements HeadGuardI {
  private logicGoalMap: {
    [goals in GuardGoalsT]: (ingre: T) => GuardResultT;
  };
  //   ((ingre: T) => GuardResultT)[];
  //   private guards: Worker<T>[];
  private guards: Worker<T>[];
  constructor({ ...props }: T) {
    // this.logics = [typeGuardLogic, lenGuradLogic, phaseGuardLogic];
    this.logicGoalMap = {
      type: typeGuardLogic,
      len: lenGuradLogic,
      phase: phaseGuardLogic,
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

    this.guards = Object.values(this.logicGoalMap).map(
      (logic) => new Worker(props, logic)
    );
  }

  validate() {
    const results = Object.keys(this.logicGoalMap).map((goal, idx) => {
      const matchedGuard = this.guards[idx];
      return {
        goal,
        result: matchedGuard.result,
      };
    });
    //test
    console.log('RESULT: ', results);

    const EndIfFalse = ['phase'];

    const invalidGoals = results
      .filter(({ result }) => !result)
      .map(({ goal }) => goal);

    const end = !EndIfFalse.every((goal) => !invalidGoals.includes(goal)); // 모두 거짓이 아니면 == 하나라도 참이면.

    // const end = !EndIfFalse.every((goal) => !results[goal]); // 모두 거짓이 아니면 == 하나라도 참이면.
    // const types: GuardGoalsT[] = Object.keys(results).filter(
    //   (goal: GuardGoalsT) => !results[goal]
    // );

    const error: HeadGuardErrorT = {
      end,
      types: invalidGoals as GuardGoalsT[], /// 슈발 개같음.
    };
    console.log('error.type:', error.types, error.types.length);
    if (error.types.length !== 0) throw error;
    return;
  }

  //   get result() {
  // const guardsAndResult = Object.keys(this.guardsAndGoals).reduce(
  //   (acc: GuardResultT, cur: GuardGoalsT) => {
  //     const goal = GuardGoalsT({
  //       ...acc,
  //       [cur]: this.guardsAndGoals[cur].result,
  //     });
  //   },
  //   this.guardsAndGoals
  // );
  // return { conclusion: true, details: guardsAndResult };
  //   }
}

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

class HeadReferee implements WorkerI<RefereeResultT> {
  //   private strikeReferee;
  //   private ballReferee;
  //   private strikeLogic = strikeLogic;
  //   private ballLogic = ballLogic;
  private logicsAndGoals: {
    logic: (ingre: LogicIngredientsI) => RefereeResultT;
    goal: RefereeGoalsT;
  }[];
  private referees;
  constructor(input, answer) {
    // this.strikeReferee = new SubReferee(input, answer, this.strikeLogic);
    // this.ballReferee = new SubReferee(input, answer, this.ballLogic);

    this.logicsAndGoals = [
      { logic: strikeLogic, goal: 'strike' },
      { logic: ballLogic, goal: 'ball' },
    ];

    this.referees = this.logicsAndGoals.map(
      ({ logic }) => new Worker({ input, answer }, logic)
    );
  }

  get result() {
    return this.referees.reduce((acc, cur, idx) => {
      const goal: RefereeGoalsT = this.logicsAndGoals[idx].goal;
      //test
      console.log('cur.result: ', cur, cur.result);
      return {
        ...acc,
        [goal]: cur.result.length,
      };
    }, {});
  }
}

class Game implements GameI {
  private _input: DataT;
  private answer: DataT;
  private phase: number;
  private isEnd: boolean;
  constructor(answer: DataT = new Questioner(3).answer) {
    // this.input = input;
    this.answer = answer;
    this.phase = 0;
    this.isEnd = false;
  }
  _validate() {
    const headGuard = new HeadGuard({
      input: this._input,
      answer: this.answer,
      phase: this.phase,
    });
    // const validity = headGuard.result;
    // if (!validity) throw {};
    headGuard.validate();
  }
  _judge() {
    console.log('this.input: ', this._input);
    const logics = [];
    const headReferee = new HeadReferee(this._input, this.answer);

    const phaseResult = headReferee.result;
    const returnTemplate = { result: phaseResult, phase: this.phase };
    if (phaseResult === 3) {
      this.isEnd = true;
    }
    return {
      end: this.isEnd,
      ...returnTemplate,
    };
  }
  process() {
    this._validate();
    this.phase += 1;
    return this._judge();
  }
  set input(newIinput: DataT) {
    this._input = newIinput;
  }
}

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

class Questioner {
  private len;
  constructor(len: number) {
    this.len = len;
  }
  _makeRandomDigit() {
    return Math.floor(Math.random() * 9);
  }
  get answer() {
    const result: number[] = [];

    for (let i = 0; i < this.len; i++) {
      result.push(this._makeRandomDigit());
    }

    return result;
  }
}

export default Game;

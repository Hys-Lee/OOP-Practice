interface GameConfigI {
  inputLen: number;
  goals: RefereeGoalsT[];
  phaseNum: number;
  userNum: number;
  oneToOne: boolean;
}
interface GameResultI {
  result: RefereeResultT;
  phase: number;
  end: boolean;
}
interface GameI {
  //   init: (config: GameConfigI) => void;
  process: () => GameResultI;
  input: DataT;
}
type GuardResultT = boolean;
type HeadGuardErrorT = {
  end: boolean;
  types: GuardGoalsT[];
};
type RefereeGoalsT = 'strike' | 'ball';
type GuardGoalsT = 'type' | 'len' | 'phase';

type RefereeResultT = { [goals in RefereeGoalsT]: number }; // mapped types라고 한다네 뤼튼이.
type LogicResultT = GuardResultT | RefereeResultT;
interface WorkerI<T> {
  result: T;
}
type DataT = number[];
interface LogicIngredientsI {
  input: DataT;
  answer: DataT;
}
interface HeadGuardI {
  validate: () => void;
}
interface HeadGuardLogicIngredientsI extends LogicIngredientsI {
  phase: number;
}

export {
  GameResultI,
  GameI,
  GuardResultT,
  GuardGoalsT,
  RefereeGoalsT,
  RefereeResultT,
  LogicResultT,
  WorkerI,
  DataT,
  LogicIngredientsI,
  HeadGuardLogicIngredientsI,
  HeadGuardI,
  HeadGuardErrorT,
};

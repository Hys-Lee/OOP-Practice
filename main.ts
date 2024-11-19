// /**   <<문제>>
//  *  숫자야구 콘솔,dom 등등 출력 방식과 상관 없이 동작하도록 만들어보기(최소 설계).
//  *  내부 외부 분리하능걸 집중해서.
//  */

// // /** [기능]
// //  * - 숫자를 외부로부터 받기 3개씩.
// //  * - 내정된 숫자와 순서와 값 모두 일치하는지 확인
// //  * - 맞추면 성공 알림 후 종료, 못 맞추면 맞출 때까지 반복
// //  *
// //  * -(세부기능)- 숫자 이외의 값이 들어오면 경고문 나오고 종료
// //  */

// /** 유스케이스 (시나리오들. 도메인 지식 기반.): 입력 칸 수가 3도 있고 4도 있는 듯 해서 N으로 일단 설정. '스트라이크'개수에 따라 성공 여부가 갈림을 반영
//  *
//  *  숫자를 N개 입력
//  *      -> N개에 대해 존재 숫자와 순서를 확인
//  *          ㄴ> N개에 대해 순서와 값이 모두 맞다면 '스트라이크'개수 ++
//  *              순서는 틀린데 값만 맞다면 '볼'개수 ++
//  *          -> '스트라이크' 개수가 N이면 성공 알리고 종료
//  *          -> '스트라이크' 개수가 N이 아니면 결과 알리기
//  *              ㄴ> '볼'과 '스트라이크' 개수 알리기
//  *                  -> 다시 입력 받기
//  *
//  *  숫자가 아닌게 들어 있음
//  *      -> invalid한 입력 알리고 종료
//  */

// /** 협력 (최대한 많은 객체가 협력하도록 나눈다면..)
//  * - 입력 받은 숫자들을 (순서 그대로, 개수도 알 수 있게)알려준다.
//  * - 입력에 문제가 있는지 없는지 알려준다.
//  * - 스트라이크 개수를 확인 해 알려준다
//  * - 볼 개수를 확인 해 알려준다
//  * - 스트라이크 개수가 N개(최초 입력 개수)라면 성공이라 알려준다
//  * - 스트라이크 개수가 N개가 아니라면 스트 개수 및 볼 개수를 알려준다.
//  * -
//  */

// /** 도메인 모델과 책임    (경호원, 심판이 주도적이지 않은 것 같은데. 쩌리들이.)
//  * - 사용자: 숫자들을 입력해주는 책임
//  * - 경호원: 사용자의 입력이 valid한지 확인하는 책임
//  * -- 개수 경호원: 출제자로부터 N을 듣고 사용자 입력 개수가 N인지 확인하는 경호원
//  * -- 값 경호원: 사용자가 숫자를 입력했는지 확인하는 경호원
//  * -- 책임 경호원: 출제자로부터 조건 듣고 다른 경호원들에게 일을 분배 후 정리
//  * ~~~~~~~~~~~~~~~~~~~- 판매자: 경호원으로부터 숫자를 인계받아 각 영역의 심판들에게 알려주는 책임~~~~~~~~~~~~~~~~``
//  * - 출제자: 게임마다 숫자들을 내정하는 책임
//  * - 심판: 판매자로부터 인계받은 숫자들과 출제자로부터 받은 숫자들을 비교 후 판정 책임
//  * -- 스트라이크 심판: 스트라이크 개수만 체크하는 심판
//  * -- 볼 심판: 볼 개수만 체크하는 심판
//  * -- 결과 판정 심판: 다른 심판들로부터 결과를 수집해 성공 여부를 판단하는 심판
//  * - 안내자: 심판으로부터 판정 결과를 듣고 사용자에게 알리는 책임
//  */

// /** 객체들이 외부에 재공할 행동(메시지들)
//  * - 사용자->출제자: 숫자 N개를 사용할 것이라 알림
//  * - 출제자->책임 경호원( -> 개수 경호원): 숫자 N개를 받아야 한다고 알림
//  * - 사용자->책임 경호원(->개수, 값): 입력 값들을 넘겨줌
//  * - 책임 경호원->개수 경호원: 입력 값들의 개수 넘겨줌
//  * - 개수 경호원->책임 경호원: 개수가 N이 아님을 알림
//  * - 개수 경호원->책임 경호원: 개수가 N은 맞다고 알림
//  * - 책임 경호원->값 경호원: 입력 값들을 보내줌
//  * - 값 경호원->책임 경호원: 숫자가 아닌게 섞여있다 알림
//  * - 값 경호원->책임 경호원: 전부 숫자가 맞다고 알림
//  * - 책임 경호원->안내자: invalid한 입력과 그 이유를 알림
//  * - 책임 경호원->결과 판정 심판: valid한 입력 값들을 넘겨줌
//  * - 출제자->결과 판정 심판: 정답을 알려줌
//  * - 결과 판정 심판->스트라이크 심판: 입력 값들과 정답을 넘겨줌
//  * - 결과 판정 심판->볼 심판: 입력 값들과 정답을 넘겨줌
//  * - 스트라이크 심판->결과 판정 심판: 스트라이크 개수를 알려줌
//  * - 볼 심판->결과 판정 심판: 볼 개수를 알려줌
//  * - 결과 판정 심판->안내자: 성공 여부와 스트라이크 및 볼 개수를 알려줌
//  */

// /** 객체들이 가져야 할 상태들.  (사용자와 )
//  * - 출제자: 랜덤한 N개 숫자 값
//  * - 사용자: N값, 지급할 입력값들 -- 일단 제외.
//  * - 안내자: 성공 멘트. 실패 멘트 템플릿(결과 보여주는)
//  * - 책임 경호원: validity
//  * -- 값 경호원, 개수 경호원:-
//  * - 결과 판정 심판: 성공 여부
//  * - 스트라이크 심판: 스트라이크 개수
//  * - 볼 심판: 볼 개수
//  */

// interface QuestionerInterface<T> {
//   // 자료구조를 마음대로 정해도 되는가?
//   getAnswer: () => T[];
// }

// interface AnnouncerInterface<S, T> {
//   // _successComment: string;
//   // _makeFailureComment: (results: S) => string;
//   getErrorComment: (result: S) => string;
//   getGameComment: (result: T) => string;
//   getInitComment: () => string;
// }

// interface GuardInterface<U> {
//   getValidity: () => U;
// }
// interface HeadGuardInterface extends GuardInterface<ValidityResultType> {
//   // subValidityResults: U;
//   getValidity: () => ValidityResultType;
// }

// interface ExchangerInterface<S, T> {
//   getArrangedInput: (input: S) => T;
// }

// interface HeadRefreeInterface<T> {
//   // strikeCount: number;
//   // ballCount: number;
//   // result: boolean;
//   getResult: () => T;
// }
// interface SubRefreeInterface<T> {
//   // count: number;
//   getCount: (input: T) => number;
// }
// ////////////// 쥰내 애매한게, 서로 주고 받는 메시지 형식을 정해야 하는데, 이걸 interface로 정하는게 public한건가? 그럼 뭐로 정해야해? 그래서 일단 type로 둠.
// type AnswerType = number[];
// type ValidityResultType = {
//   // theNumberOfInput: number;
//   inputLengthValidity: boolean;
//   inputTypeValidity: boolean;
// };
// type RoundResultType = {
//   ballCount: number;
//   strikeCount: number;
// };
// type SubValidityResultType = {
//   result: boolean;
//   // detail: {
//   //   validInputCondition: any;
//   //   currentInput: any;
//   // };
// };
// // type TotalSubValidityResultType = {
// //   // totalSubresult: { SubValidityResultType };
// // };
// type UserInputType = string;
// type InputArrangedType = number[];

// ///////////

// // class User {
// //   constructor(n, inputs) {
// //     this.n = n;
// //     this.inputs = inputs;
// //   }
// // }
// class Questioner implements QuestionerInterface<Number> {
//   private n = 0;
//   private answer: number[] = [];
//   constructor(n) {
//     this.n = n;
//   }
//   private makeAnswer = function () {
//     // 만들고
//     let answer = [1];
//     this.answer = answer;
//   };
//   public getAnswer() {
//     // 랜덤하게 n개의 숫자를 반환.
//     return this.answer;
//   }
// }
// class Announcer implements AnnouncerInterface<ValidityResultType, any> {
//   private answerLen = 0;
//   private chooseErrorComment = (
//     validityResult: ValidityResultType,
//     answerLen: number
//   ) => {
//     if (
//       !validityResult.inputTypeValidity &&
//       // validityResult.theNumberOfInput === answerLen
//       validityResult.inputLengthValidity
//     )
//       return '숫자를 입력해주세요';
//     else if (
//       validityResult.inputTypeValidity &&
//       // !(validityResult.theNumberOfInput === answerLen)
//       !validityResult.inputLengthValidity
//     )
//       return `${answerLen}자리로 입력해주세요`;
//     else if (
//       !validityResult.inputTypeValidity &&
//       // !(validityResult.theNumberOfInput === answerLen)
//       !validityResult.inputLengthValidity
//     )
//       return `${answerLen}자리 숫자로 입력해주세요`;
//     else {
//       return '정확하게 입력하셨네요. 시스템이 맛이 갔나봅니다.';
//     }
//   };
//   private chooseGameComment = (roundResult: RoundResultType) => {
//     if (roundResult.strikeCount === this.answerLen) return '정 답 !';
//     else
//       return `스트라이크: ${roundResult.strikeCount}개, 볼: ${roundResult.ballCount}개 !`;
//   };
//   private chooseInitComment = () =>
//     `게임을 시작합니다. ${this.answerLen}자리 숫자를 입력하세요`;

//   constructor(answerLen: number) {
//     this.answerLen = answerLen;
//   }

//   public getInitComment = () => {
//     return this.chooseInitComment(); // 이래도 되나.. 너무 의미없는 분리가 아닌가? 나중에 분리할 때가 오면 분리해도 되는거 아닌가?
//   };
//   public getErrorComment = (validityResult: ValidityResultType) => {
//     return this.chooseErrorComment(validityResult, this.answerLen);
//   };
//   public getGameComment = (roundResult: RoundResultType) => {
//     return this.chooseGameComment(roundResult);
//   };
// }

// /// 이렇게 알아서 만들어주면 좋은데, 이러면 prop이름이 type에 종속되어 있어서, 같이 변경시켜줘야함. 뭔가 더 아름다운 하나로 다 커버치는 방법 없나?
// const guardClasses = [
//   {
//     resultPropName: 'inputLengthValidity',
//     constructor: (input: UserInputType, answer: AnswerType) =>
//       new InputLengthGuard(input, answer),
//   },
//   {
//     resultPropName: 'inputTypeValidity',
//     constructor: (input: UserInputType, answer: AnswerType) =>
//       new InputTypeGuard(input, answer),
//   },
// ]; // 헬퍼 함수?

// class HeadGuard implements HeadGuardInterface {
//   // private inputTypeGuard;
//   /// 이렇게 사용하면, 나중에 변경할 때, 내부에서 이 부분 하나하나 찾아서 고쳐야 하자너...

//   private guardLists: GuardInterface<SubValidityResultType>[] = [];
//   private collectValidities = (): { [props: string]: boolean } => {
//     // inputLengthValidity: boolean;
//     // inputTypeValidity: boolean;
//     const result = guardClasses.reduce(
//       (acc, cur, idx) => ({
//         ...acc,
//         [cur.resultPropName]: this.guardLists[idx].getValidity().result,
//       }),
//       {}
//     );
//     return result;
//   };
//   constructor(input: UserInputType, answer: AnswerType) {
//     guardClasses.forEach((classInfos) => {
//       const subGuard = classInfos.constructor(input, answer);
//       this.guardLists.push(subGuard);
//     });
//   }
//   public getValidity = () => {
//     const validitiesResult = this.collectValidities();
//     return {
//       inputLengthValidity: validitiesResult.inputLengthValidity,
//       inputTypeValidity: validitiesResult.inputTypeValidity,
//     };
//   };
// }
// class InputLengthGuard implements GuardInterface<SubValidityResultType> {
//   private inputLength = 0;
//   private answerLength = 0;
//   constructor(input: UserInputType, answer: AnswerType) {
//     this.inputLength = input.length;
//     this.answerLength = answer.length;
//   }
//   public getValidity() {
//     return { result: this.inputLength === this.answerLength };
//   }
// }
// class InputTypeGuard implements GuardInterface<SubValidityResultType> {
//   // private inputArray: string[];
//   // constructor(input: UserInputType, answer: AnswerType) {
//   //   this.inputArray = input.split('');
//   // }
//   // public getValidity() {
//   //   const result = this.inputArray.every((value) => {
//   //     return !Number.isNaN(Number(value));
//   //   });
//   //   return { result: result };
//   // }
//   private exchangedInput: InputArrangedType;
//   private exchanger; // 얘가 교환원을 불러도 되는건가?
//   constructor(input: UserInputType, answer: AnswerType) {
//     this.exchanger = new Exchanger();
//     this.exchangedInput = this.exchanger.getArrangedInput(input);
//   }
//   public getValidity() {
//     const result = this.exchangedInput.every(
//       (value: number | typeof NaN) => !Number.isNaN(value) /////////// typeof NaN은 'number'임. coersion인듯.. ㅄ
//     );
//     return { result: result };
//   }
// }

// class Exchanger
//   implements ExchangerInterface<UserInputType, InputArrangedType>
// {
//   public getArrangedInput = (input: UserInputType) => {
//     if (typeof input === 'string') {
//       /// 이게 맞나??? 근데 userInputType이 바뀐다면, Exchanger는 각 타입에 대해 처리하는거로 하고 싶음. UserInputType이라는 이름이 문제인가?
//       return input.split('').map((chr) => Number(chr)) as InputArrangedType;
//     } else {
//       // 이거 뭐 어케해야함. 아직 모르는건데.
//       return [];
//     }
//   };
// }

// class HeadRefree implements HeadRefreeInterface<RoundResultType> {
//   private strikeRefree;
//   private ballRefree;
//   private arrangedInput;
//   private result;
//   constructor(input: UserInputType, answer: AnswerType) {
//     this.arrangedInput = new Exchanger().getArrangedInput(input);
//     this.strikeRefree = new StrikeRefree(this.arrangedInput, answer);
//     this.ballRefree = new BallRefree(this.arrangedInput, answer);
//   }

//   getResult = () => ({
//     strikeCount: this.strikeRefree.getCount(),
//     ballCount: this.ballRefree.getCount(),
//   });
// }
// class StrikeRefree implements SubRefreeInterface<InputArrangedType> {
//   private count;
//   private countStrike(input: InputArrangedType, answer: AnswerType) {
//     // 미친 input과 answer이 같은 타입임을 가정하고 하고 있네..
//     return input.reduce(
//       (acc, cur, idx) => (cur === answer[idx] ? acc + 1 : acc),
//       0
//     );
//   }
//   constructor(input: InputArrangedType, answer: AnswerType) {
//     this.count = this.countStrike(input, answer);
//   }
//   public getCount() {
//     return this.count;
//   }
// }
// class BallRefree implements SubRefreeInterface<InputArrangedType> {
//   private count;
//   private countBall(input: InputArrangedType, answer: AnswerType) {
//     // 미친 input과 answer이 같은 타입임을 가정하고 하고 있네..
//     const getValuePoses = (
//       target: any[] // 여기 any말고 어케해야함..
//     ) =>
//       target.reduce(
//         (acc, cur, idx) => ({
//           ...acc,
//           [cur]: [...acc[cur], idx],
//         }),
//         {}
//       );
//     const answerValuePoses: { [key: string | number]: number[] } =
//       getValuePoses(answer);
//     const inputValuePoses: { [key: string | number]: number[] } =
//       getValuePoses(input);
//     Object.keys(answerValuePoses).forEach((key) => {
//       ///############################## => 추상화 단계가 너무 raw함.    아니면 로직을 바꾸던가.
//       if (inputValuePoses[key]) {
//         // 존재해야함
//         answerValuePoses[key].forEach((idxVal) => {
//           if (inputValuePoses[key].includes(idxVal)) {
//             // 동일 인덱스면 버리기
//             this.count += 1;
//           }
//         });
//       }
//     });
//   }
//   constructor(input: InputArrangedType, answer: AnswerType) {
//     this.count = 0;
//     this.countBall(input, answer);
//   }
//   public getCount() {
//     return this.count;
//   }
// }

// // interface HeadRefreeInterface {
// //   strikeCount: number;
// //   ballCount: number;
// //   result: boolean;
// // }
// // interface SubRefreeInterface {
// //   count: number;
// // }

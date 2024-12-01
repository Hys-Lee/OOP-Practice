import ArrayPitchingDTO from '../../../models/PitchingDTO/classes/ArrayPithcingDTO';
import { AnswerMaker } from '../interfaces/AnswerMaker';

class RandomAnswerMaker implements AnswerMaker {
  private _uniquifyWithSet(answerSet: Set<number>) {
    const makeRandomNum = () => Math.floor(Math.random() * 10);
    let randNum = makeRandomNum();
    while (answerSet.has(randNum) || randNum === 10) {
      randNum = makeRandomNum();
    }
    return randNum;
  }
  private _makeAnswerSet(len: number) {
    const answerSet = new Set<number>();

    for (let i = 0; i < len; i++) {
      answerSet.add(this._uniquifyWithSet(answerSet));
    }
    return answerSet;
  }
  makeAnswer(len: number) {
    const answerArr = Array.from(this._makeAnswerSet(len));
    const answer = new ArrayPitchingDTO(answerArr);

    return answer;
  }
}

export default RandomAnswerMaker;

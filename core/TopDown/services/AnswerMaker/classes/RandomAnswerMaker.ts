import PitchingDTOFactory from '../../../model/PitchingDTO/PitchingDTOFactory';

class RandomAnswerMaker {
  constructor() {}

  makeUniqueRandom(accumulatedNumbers: number[]) {
    const makeRandom = () => Math.round(Math.random() * 9);
    let randomCandidate = makeRandom();
    while (accumulatedNumbers.includes(randomCandidate)) {
      randomCandidate = makeRandom();
    }
    return randomCandidate;
  }

  makeAnswer(len: number) {
    const answer = [];
    for (let i = 0; i < len; i++) {
      answer.push(this.makeUniqueRandom(answer));
    }

    return PitchingDTOFactory.createPitchingDTO(answer);
  }
}

export default RandomAnswerMaker;

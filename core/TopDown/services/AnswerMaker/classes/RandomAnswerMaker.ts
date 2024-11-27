import PitchingDTOFactory from '../../../model/PitchingDTO/PitchingDTOFactory';
import {
  IdentityNumberPitchingDTOGuard,
  TypePitchingDTOGuard,
  PitchingDTOGuard,
} from '../../../model/PitchingDTO/PitchingDTOGuard';

class RandomAnswerMaker {
  private typePitchingDTOGuard: PitchingDTOGuard;
  private identityPitchingDTOGuard: PitchingDTOGuard;
  constructor(
    typePitchingDTOGuard: PitchingDTOGuard,
    identityPitchingDTOGuard: PitchingDTOGuard
  ) {
    this.typePitchingDTOGuard = typePitchingDTOGuard;
    this.identityPitchingDTOGuard = identityPitchingDTOGuard;
  }

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

    return PitchingDTOFactory.createPitchingDTO(
      answer,
      this.typePitchingDTOGuard,
      this.identityPitchingDTOGuard
    );
  }
}

export default RandomAnswerMaker;

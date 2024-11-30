import { PitchingDTO } from '../../../models/PitchingDTO/interfaces/PitchingDTO';

interface AnswerMaker {
  makeAnswer: (len: number) => PitchingDTO;
}

export { AnswerMaker };

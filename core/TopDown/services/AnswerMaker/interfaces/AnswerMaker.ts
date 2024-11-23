import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';

interface AnswerMaker {
  makeAnswer: (len: number) => PitchingDTO;
}
export { AnswerMaker };

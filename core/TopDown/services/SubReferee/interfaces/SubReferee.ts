import { SubRefereeResult } from '../../DataTypes';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';

interface SubReferee {
  judge: (input: PitchingDTO, answer: PitchingDTO) => SubRefereeResult;
}
export default SubReferee;

import { StrikeReferee } from '../StrikeReferee/interfaces/StrikeReferee';
import { BallReferee } from '../BallRefree/interfaces/BallReferee';

type SubReferee = StrikeReferee | BallReferee;

export default SubReferee;

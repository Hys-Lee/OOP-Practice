import { PitchingDTO } from '../interfaces/PitchingDTO';

class ArrayPitchingDTO implements PitchingDTO {
  private _pithingData: number[];
  constructor(pitchingData: number[]) {
    this._pithingData = pitchingData;
  }
  get pitchingData() {
    return this._pithingData;
  }
}
export default ArrayPitchingDTO;

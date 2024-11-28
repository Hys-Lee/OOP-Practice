class ArrayPitchingDTO {
  private _pithingData: number[];
  constructor(pitchingData: number[]) {
    this._pithingData = pitchingData;
  }
  get pitchingData() {
    return this._pithingData;
  }
}
export default ArrayPitchingDTO;

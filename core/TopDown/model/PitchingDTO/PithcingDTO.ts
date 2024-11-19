class PitchingDTO {
  private data: number[];
  constructor(input: number[]) {
    this.data = input;
  }
  get pitchingData() {
    return this.data;
  }
}
export default PitchingDTO;

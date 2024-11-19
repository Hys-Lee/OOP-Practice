class PitchingDTOGuard {
  constructor() {}
  validate(input: any): input is number[] {
    return (
      Array.isArray(input) &&
      input.every((val) => Number.isInteger(val) && !Number.isNaN(val))
    );
  }
}
export default PitchingDTOGuard;

interface SubGuardResult {
  type: string;
  result: boolean;
}
interface SubRefereeResult {
  type: string;
  result: number;
}
interface PitchingResult {
  strike: number;
  ball: number;
}

export { SubGuardResult, SubRefereeResult, PitchingResult };

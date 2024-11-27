type GuardResult = ('type' | 'len' | 'phase')[];
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

export { GuardResult, SubGuardResult, SubRefereeResult, PitchingResult };

interface PitchingDTOGuard {
  validate: (input: any) => boolean;
}

class TypePitchingDTOGuard implements PitchingDTOGuard {
  constructor() {}
  validate(input: any): input is number[] {
    return (
      Array.isArray(input) &&
      input.every((val) => Number.isInteger(val) && !Number.isNaN(val))
    );
  }
}

class IdentityNumberPitchingDTOGuard implements PitchingDTOGuard {
  private identitySet: Set<number>;
  constructor() {
    this.identitySet = new Set();
  }
  validate(input: number[]) {
    return input.every((value) => {
      if (this.identitySet.has(value)) return false;

      this.identitySet.add(value);
      return true;
    });
  }
}

export { TypePitchingDTOGuard, IdentityNumberPitchingDTOGuard };

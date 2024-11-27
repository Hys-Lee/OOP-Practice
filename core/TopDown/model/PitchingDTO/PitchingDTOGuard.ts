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
  constructor() {}
  validate(input: number[]) {
    const identitySet = new Set();
    const result = input.every((value) => {
      if (identitySet.has(value)) return false;

      identitySet.add(value);

      return true;
    });

    return result;
  }
}

export {
  PitchingDTOGuard,
  TypePitchingDTOGuard,
  IdentityNumberPitchingDTOGuard,
};

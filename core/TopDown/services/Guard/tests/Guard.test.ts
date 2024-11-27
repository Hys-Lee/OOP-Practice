// import LenGuard from '../../SubGuard/classes/LenGuard';
// import LenGuard from './_mocks_/LenGuard';
// import TypeGuard from '../../SubGuard/classes/TypeGuard';
// import PhaseGuard from '../../SubGuard/classes/PhaseGuard';
import DefaultGameConfigDTO from '../../../model/ConfigDTO/GameConfigDTO';
import { GameErrorDTO } from '../../../model/ErrorDTO/ErrorDTO';
import PitchingDTO from '../../../model/PitchingDTO/PithcingDTO';
import Guard1 from '../classes/Guard1';

const LenGuard = jest.fn().mockImplementation((isInvalid) => {
  return {
    validate: () => ({
      type: 'len',
      result: isInvalid ? false : true,
    }),
  };
});

const PhaseGuard = jest.fn().mockImplementation((isInvalid) => {
  return {
    validate: () => ({
      type: 'phase',
      result: isInvalid ? false : true,
    }),
  };
});

const TypeGuard = jest.fn().mockImplementation((isInvalid) => {
  return {
    validate: () => ({
      type: 'type',
      result: isInvalid ? false : true,
    }),
  };
});

describe('Guard테스트', () => {
  const tmpInput = new PitchingDTO([1, 2, 3]);
  const tmpConfig = new DefaultGameConfigDTO(0, 0);

  test('모두 틀렸을 때', () => {
    const g = new Guard1(
      new TypeGuard(true),
      new LenGuard(true),
      new PhaseGuard(true)
    );

    const answer = ['len', 'type', 'phase'];
    const meaninglessLen = 0;
    const meaninglessPhase = 0;
    expect(
      g.validate(tmpInput, meaninglessLen, meaninglessPhase, meaninglessPhase)
    ).toEqual(expect.arrayContaining(answer));
  });

  test('모두 괜찮을 때', () => {
    const g = new Guard1(
      new TypeGuard(false),
      new LenGuard(false),
      new PhaseGuard(false)
    );
    const answer = [];
    const meaninglessPhase = 0;
    const meaninglessLen = 0;
    expect(
      g.validate(tmpInput, meaninglessLen, meaninglessPhase, meaninglessPhase)
    ).toEqual(answer);
  });
});

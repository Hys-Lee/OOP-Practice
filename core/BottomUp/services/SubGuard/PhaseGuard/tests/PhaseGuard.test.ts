import DefaultPhaseGuard from '../classes/DefaultPhaseGuard';

describe('페이즈 가드 테스트', () => {
  const pg = new DefaultPhaseGuard();
  const configPhase = 4;
  test('Valid: 현재 페이즈가 설정값 이하일 때', () => {
    const curPhase = 4;
    const result = pg.validate(curPhase, configPhase);

    expect(result).toEqual({ phase: true });
  });
  test('Invalid: 현재 페이즈가 설정값 초과할 때', () => {
    const curPhase = 5;
    const result = pg.validate(curPhase, configPhase);

    expect(result).toEqual({ phase: false });
  });
});

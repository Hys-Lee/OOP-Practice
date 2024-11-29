class DefaultPhaseGuard {
  validate(curPhase: number, configPhaes: number) {
    const result: boolean = curPhase <= configPhaes;
    return { phase: result };
  }
}

export default DefaultPhaseGuard;

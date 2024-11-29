import { LenGuard } from '../LenGuard/interfaces/LenGuard';
import { PhaseGuard } from '../PhaseGuard/interfaces/PhaseGuard';
import { TypeGuard } from '../TypeGuard/interfaces/TypeGuard';

type SubGuard = TypeGuard | LenGuard | PhaseGuard;

export default SubGuard;

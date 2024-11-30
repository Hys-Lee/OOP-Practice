// interface ValidationError {
//   [type: string]: boolean;
// }

import ValidationTypes from '../../RuleTerms/Validation/types/ValidationTypes';

type ValidationError = {
  [key in ValidationTypes]?: boolean;
};
export { ValidationError };

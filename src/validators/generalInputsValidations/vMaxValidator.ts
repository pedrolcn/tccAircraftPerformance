import { Validation, lessThanOrEqual, required } from 'ecv-validation';

export default new Validation(
  'vMax',
  'velocidade maxima',
  'number',
  [required, lessThanOrEqual(300)],
);

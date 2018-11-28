import { Validation, lessThanOrEqual, required } from 'ecv-validation';

export default new Validation(
  'xMax',
  'X maximo',
  'number',
  [required, lessThanOrEqual(300)],
);

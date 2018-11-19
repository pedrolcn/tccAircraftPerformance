import { Validation, required, largerThanOrEqual, lessThan } from 'ecv-validation';

export default new Validation(
  'h',
  'altitude',
  'number',
  [required, largerThanOrEqual(0), lessThan(10000)],
);

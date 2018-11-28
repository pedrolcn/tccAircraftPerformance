import { Validation, largerThan, required } from 'ecv-validation';

export default new Validation(
  'deltaX',
  'delta X',
  'number',
  [required, largerThan(0)],
);

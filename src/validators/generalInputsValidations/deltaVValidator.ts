import { Validation, largerThan, required } from 'ecv-validation';

export default new Validation(
  'deltaV',
  'delta V',
  'number',
  [required, largerThan(0)],
);

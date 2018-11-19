import { Validation, required, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'S',
  'Area de asa',
  'number',
  [required, largerThanOrEqual(0)],
);

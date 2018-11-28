import { Validation, largerThanOrEqual, required } from 'ecv-validation';

export default new Validation(
  'xMin',
  'X minimo',
  'number',
  [required, largerThanOrEqual(2)],
);

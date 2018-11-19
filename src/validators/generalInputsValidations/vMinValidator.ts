import { Validation, largerThanOrEqual, required } from 'ecv-validation';

export default new Validation(
  'vMin',
  'velocidade minima',
  'number',
  [required, largerThanOrEqual(2)],
);

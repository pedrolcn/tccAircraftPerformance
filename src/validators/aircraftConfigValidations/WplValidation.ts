import { Validation, required, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'Wpl',
  'Peso máximo de payload',
  'number',
  [required, largerThanOrEqual(0)],
);

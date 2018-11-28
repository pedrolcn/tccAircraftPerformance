import { Validation, required, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'W0',
  'Peso d aeronave',
  'number',
  [required, largerThanOrEqual(0)],
);

import { Validation, required, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'Wmax',
  'Peso máximo de decolagem',
  'number',
  [required, largerThanOrEqual(0)],
);

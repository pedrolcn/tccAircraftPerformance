import { Validation, required, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'Wf',
  'Peso de combustivel',
  'number',
  [required, largerThanOrEqual(0)],
);

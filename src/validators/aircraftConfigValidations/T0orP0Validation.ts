import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'T0orP0',
  'Empuxo/Potência',
  'number',
  [largerThanOrEqual(0)],
);

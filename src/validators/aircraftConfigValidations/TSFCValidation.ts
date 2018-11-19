import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'TSFC',
  'TSFC',
  'number',
  [largerThanOrEqual(0)],
);

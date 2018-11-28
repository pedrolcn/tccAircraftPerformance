import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'dragCD0Cruise',
  'CD0',
  'number',
  [largerThanOrEqual(0)],
);

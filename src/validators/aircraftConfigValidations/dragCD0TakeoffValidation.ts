import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'dragCD0Takeoff',
  'CD0',
  'number',
  [largerThanOrEqual(0)],
);

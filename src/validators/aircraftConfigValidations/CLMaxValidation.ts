import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'CLMax',
  'CL Máximo',
  'number',
  [largerThanOrEqual(0)],
);

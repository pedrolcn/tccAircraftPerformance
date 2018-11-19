import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'engineN',
  'Coeficiente N do motor',
  'number',
  [largerThanOrEqual(0)],
);

import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'dragK',
  'Coeficiente de arrasto induzido',
  'number',
  [largerThanOrEqual(0)],
);

import { Validation, largerThanOrEqual } from 'ecv-validation';

export default new Validation(
  'loadFactor',
  'Fator de Carga',
  'number',
  [largerThanOrEqual(0)],
);

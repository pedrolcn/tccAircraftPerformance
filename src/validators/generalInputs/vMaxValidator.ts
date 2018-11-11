import { Validation, lessThanOrEqual, required } from '../../validation';

export default new Validation(
  'vMax',
  'velocidade maxima',
  'number',
  required,
  lessThanOrEqual(300),
);

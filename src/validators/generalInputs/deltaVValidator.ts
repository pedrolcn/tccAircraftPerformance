import { Validation, largerThan, required } from '../../validation';

export default new Validation(
  'deltaV',
  'delta V',
  'number',
  required,
  largerThan(0),
);

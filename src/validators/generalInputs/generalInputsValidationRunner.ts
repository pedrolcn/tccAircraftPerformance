import { ValidationRunner } from '../../validation';
import { IGeneralInputs } from '../../views/PerformanceView';
import { deltaVValidator, vMinValidator, vMaxValidator } from './';

export default new ValidationRunner<IGeneralInputs>(
  deltaVValidator,
  vMinValidator,
  vMaxValidator,
);

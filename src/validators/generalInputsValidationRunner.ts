import { ValidationRunner } from 'ecv-validation';
import { IGeneralInputs } from '../views/PerformanceView';
import { deltaVValidator, vMinValidator, vMaxValidator } from './generalInputsValidations';

export default new ValidationRunner<IGeneralInputs>(
  deltaVValidator,
  vMinValidator,
  vMaxValidator,
);

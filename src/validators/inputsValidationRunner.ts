import { ValidationRunner } from 'ecv-validation';
import { AircraftConfiguration } from '../views/PerformanceView';
import * as Validations  from './aircraftConfigValidations';

export default new ValidationRunner<AircraftConfiguration>(
  Validations.CLMaxValidation,
  Validations.SValidation,
  Validations.T0orP0Validation,
  Validations.TSFCValidation,
  Validations.WValidation,
  Validations.dragCD0Validation,
  Validations.dragKValidation,
  Validations.engineNValidation,
  Validations.hValidation,
  Validations.loadFactorValidation,
);

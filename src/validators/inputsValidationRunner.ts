import { ValidationRunner } from 'ecv-validation';
import { AircraftConfiguration } from '../views/PerformanceView';
import * as Validations  from './aircraftConfigValidations';

export default new ValidationRunner<AircraftConfiguration>(
  Validations.CLMaxValidation,
  Validations.SValidation,
  Validations.T0orP0Validation,
  Validations.TSFCValidation,
  Validations.W0Validation,
  Validations.WfValidation,
  Validations.WmaxValidation,
  Validations.dragCD0CruiseValidation,
  Validations.dragCD0LandingValidation,
  Validations.dragCD0TakeoffValidation,
  Validations.dragKValidation,
  Validations.engineNValidation,
  Validations.hValidation,
  Validations.loadFactorValidation,
);

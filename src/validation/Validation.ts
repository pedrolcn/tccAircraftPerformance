import { FormData } from '../views/PerformanceView';
import { ValidationRule } from './validationRules';

export default class Validation<S> {
  protected validationRules: ValidationRule[];
  
  constructor(
    public fieldName: string,
    public alias: string,
    public type: string,
    ...validationRules: ValidationRule[]
  ) {
    this.validationRules = validationRules;
  }

  public validate(value: any): { error: string, invalid: boolean} {
    const out = this.validationRules.reduce(
      (prev: { error: string[], invalid: boolean}, currentRule) => {
        const { error, invalid } = currentRule(this.alias, value);

        return {
          error: error ? [...prev.error, error] : prev.error,
          invalid: prev.invalid || invalid,
        };
      },
      { error: [], invalid: false },
    );

    return {
      error: out.error.join(', '),
      invalid: out.invalid,
    };
  }
}

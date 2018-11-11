import Validation from './Validation';
import { FormData } from '../views/PerformanceView';

export default class ValidationRunner<S> {
  protected validations: { [s: string]: Validation<S>};

  constructor(...validations: Validation<S>[]) {
    this.validations = validations.reduce((prev: any, curr) => Object.assign(prev, { [curr.fieldName]: curr }), {});
  }

  public run(oldData: FormData<S>, name: string, value: any): FormData<S> {
    const internalFormData = oldData;
    const validation = this.validations[name];

    if (validation) {
      const { error, invalid } = validation.validate(value);
      
      if (invalid) {
        (internalFormData.errors as any)[name] = error;
        (internalFormData.invalid as any)[name] = true;
      } else {
        (internalFormData.errors as any)[name] = undefined;
        (internalFormData.invalid as any)[name] = false;
        (internalFormData.values as any)[name] = validation.type === 'number' ? parseFloat(value) : value;  
      }
    } else {
      (internalFormData.values as any)[name] = value;
    }
    
    return internalFormData;
  }
}

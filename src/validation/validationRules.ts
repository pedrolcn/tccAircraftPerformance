export type ValidationRule = (alias: string, value: any) => { invalid: boolean, error: string};

export function lessThan(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value >= threshold) {
      return {
        error: `${alias} deve ser menor que ${threshold} `,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export function lessThanOrEqual(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value > threshold) {
      return {
        error: `${alias} deve ser menor ou igual a que ${threshold} `,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export function largerThan(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value <= threshold) {
      return {
        error: `${alias} deve ser maior que ${threshold} `,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export function largerThanOrEqual(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value < threshold) {
      return {
        error: `${alias} deve ser maior ou igual a ${threshold} `,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export function longerThan(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value <= threshold) {
      return {
        error: `${alias} deve ser maior que ${threshold} caracteres`,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export function shorterThan(threshold: number):ValidationRule {
  return (alias: string, value: number) => {
    if (value > threshold) {
      return {
        error: `${alias} deve ser maior que ${threshold} caracteres`,
        invalid: true,
      };
    }
    return {
      error: '',
      invalid: false,
    };
  };
}

export const required: ValidationRule = (alias: string, value: number) => {
  if (!value) {
    return {
      error: `${alias} é obrigatorio`,
      invalid: true,
    };
  }
  return {
    error: '',
    invalid: false,
  };
};

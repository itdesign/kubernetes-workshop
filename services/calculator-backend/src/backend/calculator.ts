import { eval } from 'mathjs';

export const calculator = async (expression: string): Promise<number> => {
  return eval(expression);
};

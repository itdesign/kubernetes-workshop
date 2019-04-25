import { eval } from 'mathjs';

export const calculator = async (expression: string): Promise<string> => {
  return eval(expression).toString();
};

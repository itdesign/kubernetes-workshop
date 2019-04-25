import axios from 'axios';

const calculatorServerBaseUrl = process.env.CALCULATOR_BACKEND_BASE_URL || 'http://localhost:8080';

interface RequestSuccess<T> {
  type: 'SUCCESS';
  data: T;
}

interface RequestError {
  type: 'ERROR';
  error: string;
}

export type RequestResult<T> = RequestSuccess<T> | RequestError;

const executeRequest = async <T>(path: string): Promise<RequestResult<T>> => {
  try {
    const response = await axios.get<T>(`${calculatorServerBaseUrl}${path}`);
    return { type: 'SUCCESS', data: response.data };
  } catch (error) {
    return { type: 'ERROR', error: error.message };
  }
};

export const requestCalculate = async (expression: string) =>
  executeRequest<{ result: number; instance: string }>(`/api/calculate?expression=${encodeURIComponent(expression)}`);

export const requestHistory = async () =>
  executeRequest<{ records: [{ expression: string; result: number }]; instance: string }>(`/api/history`);

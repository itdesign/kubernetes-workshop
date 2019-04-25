const inMemoryHistory = Array<{ expression: string; result: number }>();

export const addToHistory = (expression: string, result: number) => {
  inMemoryHistory.push({ expression, result });
};

export const getHistory = () => inMemoryHistory;

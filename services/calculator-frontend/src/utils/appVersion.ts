export const appVersion = parseInt(process.env.VERSION || '2');

export const isHistoryEnabled = () => appVersion >= 2;
export const isNewBackground = () => appVersion >= 2;

export const appVersion = parseInt(process.env.APP_VERSION || '3');

export const isHistoryEnabled = () => appVersion >= 2;
export const isNewBackground = () => appVersion >= 2;
export const isBetaVersion = () => appVersion >= 3;

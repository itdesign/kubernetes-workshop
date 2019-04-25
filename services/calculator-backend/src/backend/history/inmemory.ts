import { StorageAdapter } from '.';
import { HistoryRecord } from './index';

export const inmemoryStorage = (): StorageAdapter => {
  const storage = Array<HistoryRecord>();

  return {
    save: record => {
      storage.push(record);
    },
    getAll: async () => {
      return storage;
    }
  };
};

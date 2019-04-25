import { postgresqlStorage } from './postgresql';
import { inmemoryStorage } from './inmemory';
export interface HistoryRecord {
  expression: string;
  result: string;
}

export interface StorageAdapter {
  save: (record: HistoryRecord) => void;
  getAll: () => Promise<HistoryRecord[]>;
}

const storage = process.env.PG_HOST !== undefined ? postgresqlStorage() : inmemoryStorage();

export const addToHistory = (record: HistoryRecord) => {
  storage.save(record);
};

export const getHistory = () => storage.getAll();

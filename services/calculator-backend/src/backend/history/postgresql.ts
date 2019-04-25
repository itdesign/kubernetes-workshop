import { StorageAdapter, HistoryRecord } from './index';
import pgDriver from 'pg-promise';

const pgHost = process.env.PG_HOST || '127.0.0.1';
const pgPort = parseInt(process.env.PG_PORT || '5432');
const pgUser = process.env.PG_USER || 'postgres';
const pgPass = process.env.PG_PASS || 'postgres';
const pgDb = process.env.PG_DB || 'calculator';

export const postgresqlStorage = (): StorageAdapter => {
  const dbConnection = pgDriver()({
    host: pgHost,
    port: pgPort,
    user: pgUser,
    password: pgPass,
    database: pgDb
  });

  dbConnection.none(`CREATE TABLE IF NOT EXISTS history (
      expression TEXT NOT NULL,
      result TEXT NOT NULL
      )`);

  return {
    save: record => {
      dbConnection.none('INSERT INTO history(expression, result) VALUES ($1, $2)', [record.expression, record.result]);
    },
    getAll: async () => {
      const records = await dbConnection.any<HistoryRecord>('SELECT expression, result FROM history');
      return records;
    }
  };
};

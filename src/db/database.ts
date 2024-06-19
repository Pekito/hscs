import sqlite from 'better-sqlite3';
import path from 'path';
interface QueryResult {
    [key: string]: any;
  }
  
  export interface SQLiteModule {
    query: (sql: string, params?: any[]) => QueryResult[];
    run: (sql: string, params?: any[]) => void;
  }
  
  const createSQLiteModule = (databasePath: string): SQLiteModule => {
    const db = sqlite(databasePath);
    const run = (sql: string, params: any[] = []): void => {
          const statement = db.prepare(sql);
          statement.run(params);
    };
    const query = (sql: string, params: any[] = []) => {
        const statement = db.prepare(sql);
        const results = statement.all(params);
        return results as QueryResult[];
    };
  
    return { query, run };
  };

  const db = createSQLiteModule(path.join(__dirname, "..", "..", "hscs.sqlite"));
  export default db;
import * as sqlite from 'better-sqlite-pool';
import path from 'path';

interface QueryResult {
    [key: string]: any;
  }
  
  export interface SQLiteModule {
    query: (sql: string, params?: any[]) => Promise<QueryResult[]>;
    close: () => Promise<void>;
    run: (sql: string, params?: any[]) => Promise<void>
  }
  
  const createSQLiteModule = (databasePath: string): SQLiteModule => {
    const pool = new sqlite.Pool(databasePath);
    const run = async (sql: string, params: any[] = []): Promise<void> => {
        const connection = await pool.acquire();
        try {
          const statement = connection.prepare(sql);
          statement.run(params);
        } finally {
          connection.release();
        }
      };
    const query = async (sql: string, params: any[] = []): Promise<QueryResult[]> => {
      const connection = await pool.acquire();
      try {
        const statement = connection.prepare(sql);
        const results = statement.all(params);
        return results as QueryResult[];
      } finally {
        connection.release();
      }
    };
  
    const close = async (): Promise<void> => {
        pool.close();
    };
  
    return { query, close, run };
  };

  const connectionPool = createSQLiteModule(path.join(__dirname, "..", "..", "hscs.sqlite"));
  export default {
    connectionPool
  };
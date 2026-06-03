import type { SQLiteDatabase } from 'expo-sqlite';

export type DatabaseMigration = {
  version: number;
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};

export const DATABASE_NAME = 'budgetin.db';

export const databaseMigrations: DatabaseMigration[] = [
  {
    version: 1,
    name: 'create_app_meta_table',
    up: async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS app_meta (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT
        );
      `);

      await db.runAsync(
        'INSERT OR IGNORE INTO app_meta (key, value) VALUES (?, ?)',
        'initialized_at',
        new Date().toISOString()
      );
    },
  },
];

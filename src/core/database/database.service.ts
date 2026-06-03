import * as SQLite from 'expo-sqlite';
import type {
  SQLiteBindParams,
  SQLiteDatabase,
  SQLiteRunResult,
  SQLiteVariadicBindParams,
} from 'expo-sqlite';

import { DATABASE_NAME, databaseMigrations } from '@/core/database/migrations';

let databasePromise: Promise<SQLiteDatabase> | null = null;
let initializationPromise: Promise<SQLiteDatabase> | null = null;

function openDatabase() {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME);
  }

  return databasePromise;
}

async function configureDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);
}

async function getDatabaseVersion(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  return result?.user_version ?? 0;
}

async function migrateDatabase(db: SQLiteDatabase) {
  const currentVersion = await getDatabaseVersion(db);
  const pendingMigrations = databaseMigrations
    .filter((migration) => migration.version > currentVersion)
    .sort((left, right) => left.version - right.version);

  for (const migration of pendingMigrations) {
    await db.withTransactionAsync(async () => {
      await migration.up(db);
      await db.execAsync(`PRAGMA user_version = ${migration.version}`);
    });
  }
}

export async function initializeDatabase() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      const db = await openDatabase();
      await configureDatabase(db);
      await migrateDatabase(db);
      return db;
    })().catch((error) => {
      initializationPromise = null;
      throw error;
    });
  }

  return initializationPromise;
}

export async function getDatabase() {
  return initializeDatabase();
}

export async function execute(sql: string) {
  const db = await getDatabase();
  await db.execAsync(sql);
}

export async function run(
  sql: string,
  ...params: SQLiteVariadicBindParams
): Promise<SQLiteRunResult> {
  const db = await getDatabase();
  return db.runAsync(sql, ...params);
}

export async function runWithParams(sql: string, params: SQLiteBindParams) {
  const db = await getDatabase();
  return db.runAsync(sql, params);
}

export async function getFirst<T>(sql: string, params?: SQLiteBindParams) {
  const db = await getDatabase();

  if (params) {
    return db.getFirstAsync<T>(sql, params);
  }

  return db.getFirstAsync<T>(sql);
}

export async function getAll<T>(sql: string, params?: SQLiteBindParams) {
  const db = await getDatabase();

  if (params) {
    return db.getAllAsync<T>(sql, params);
  }

  return db.getAllAsync<T>(sql);
}

export async function withTransaction<T>(operation: (db: SQLiteDatabase) => Promise<T>) {
  const db = await getDatabase();
  let result: T | undefined;

  await db.withTransactionAsync(async () => {
    result = await operation(db);
  });

  return result as T;
}

export async function closeDatabase() {
  if (!databasePromise) {
    return;
  }

  const db = await databasePromise;
  await db.closeAsync();
  databasePromise = null;
  initializationPromise = null;
}

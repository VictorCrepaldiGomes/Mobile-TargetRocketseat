import { type SQLiteDatabase } from "expo-sqlite";

export async function migrate(database: SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS targets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount FLOAT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      target_id INTEGER NOT NULL,
      amount FLOAT NOT NULL,
      observation TEXT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),

      CONSTRAINT fk_target_transactions
        FOREIGN KEY (target_id)
        REFERENCES targets(id)
        ON DELETE CASCADE
    );
  `);
}

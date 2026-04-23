import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("trackcast.db");

export const initializeDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        distance REAL NOT NULL,
        maxSpeed REAL NOT NULL,
        duration INTEGER DEFAULT 0
      );
    `);
    console.log("Database initialized");
  } catch (error) {
    console.log("Database init error:", error);
  }
};

export default db;

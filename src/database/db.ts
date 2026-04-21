import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("trackcast.db");

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT DEFAULT (datetime('now','localtime')),
        distance REAL,      -- metrda
        avgSpeed REAL,      -- km/h
        maxSpeed REAL,      -- km/h
        duration INTEGER,   -- sekundda
        path TEXT           -- koordinatalar JSON string ko'rinishida
      );
    `);
    console.log("Database initialized ✅");
  } catch (error) {
    console.error("DB Init Error: ", error);
  }
};

export default db;

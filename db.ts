import { DatabaseSync } from "node:sqlite";
import fs from "fs";

export function initDb(filePath: string) {
  if (fs.existsSync(filePath)) {
    return new DatabaseSync(filePath);
  } else {
    const database = new DatabaseSync(filePath);
    // create tables
    database.exec(`
          CREATE TABLE data(
          id INTEGER PRIMARY KEY,
          text TEXT
          );
        `);
    return database;
  }
}

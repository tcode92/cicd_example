import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import fs from "node:fs";

import { initDb } from "../db";
import type { DatabaseSync } from "node:sqlite";

describe("Test database", () => {
  const dbFile = "./test.db";
  let db: DatabaseSync;
  beforeAll(() => {
    db = initDb(dbFile);
  });

  test("Table is created", () => {
    const result = db.prepare("SELECT * FROM data").get();
    expect(result).toBe(undefined);
  });

  test("Can insert into table data", () => {
    const stmt = db.prepare("INSERT INTO data (text) VALUES (?)");
    const result = stmt.run("Hello world");
    expect(result).toEqual({ lastInsertRowid: 1, changes: 1 });
  });

  test("Can read table data", () => {
    const stmt = db.prepare("SELECT * FROM data");
    const result = stmt.all();

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ id: 1, text: "Hello world" });
  });

  test("Can update table data", () => {
    const stmt = db.prepare("UPDATE data SET text = ? WHERE id = ?");
    const result = stmt.run("Hello world!", 1);
    expect(result).toEqual({ lastInsertRowid: 1, changes: 1 });
    const stmt2 = db.prepare("SELECT * FROM data");
    const result2 = stmt2.get();
    expect(result2).toEqual({ id: 1, text: "Hello world!" });
  });

  test("Can delete table data", () => {
    const stmt = db.prepare("DELETE FROM data WHERE id = ?");
    const result = stmt.run(1);
    expect(result).toEqual({ lastInsertRowid: 1, changes: 1 });
  });

  afterAll(() => {
    db.close();
    fs.unlinkSync(dbFile);
  });
});

import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { FastifyInstance } from "fastify";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { initDb } from "../db";
import { initServer } from "../server";
describe("Test server", () => {
  const dbFile = "./server-test.db";
  let server: FastifyInstance;
  let db: DatabaseSync;
  beforeAll(() => {
    db = initDb(dbFile);
    server = initServer(db);
  });
  afterAll(() => {
    db.close();
    fs.unlinkSync(dbFile);
  });
  test("Env is test", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
  test("Health check route", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/health-check",
    });
    expect(response.statusCode).toBe(200);
  });
  test("Home page", async () => {
    const response = await server.inject({
      url: "/",
      method: "GET",
    });
    expect(response.headers["content-type"]).toContain("text/html");
  });
  test("Error handler is handling async errors", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/test_error_handler",
    });
    expect(response.statusCode).toBe(500);
  });
});

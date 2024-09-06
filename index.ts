import { initDb } from "./db";
import { initServer } from "./server";

async function main() {
  const database = initDb("./store.db");
  const server = initServer(database);
  await server.listen({
    host: "127.0.0.1",
    port: process.env.PORT ? +process.env.PORT : 3000,
  });
}

main();

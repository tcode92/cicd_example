import { DatabaseSync } from "node:sqlite";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";
export function initServer(db: DatabaseSync) {
  const server = fastify({
    logger: process.env.NODE_ENV !== "test",
    return503OnClosing: true,
  });

  server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
  });
  server.get("/", (req, res) => {
    return res.sendFile("index.html");
  });
  server.addHook("onRequest", async (req) => {
    req.db = db;
  });

  server.get("/health-check", async (req, res) => {
    return res.status(200).send();
  });

  server.get("/list", async (req, res) => {
    const data = req.db.prepare("SELECT * FROM data;").all();
    return data;
  });

  /**
   * Testing route available only if NODE_ENV is test
   */
  if (process.env.NODE_ENV === "test") {
    server.get("/test_error_handler", async (req, res) => {
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Test error handler"));
        }, 2000);
      });
    });
  }
  server.setErrorHandler((error, req, res) => {
    req.log.error(error);
    if (!res.sent) {
      res.status(500).send("Internal server error");
    }
  });
  return server;
}
declare module "fastify" {
  interface FastifyRequest {
    db: DatabaseSync;
  }
}

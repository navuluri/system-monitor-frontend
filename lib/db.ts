import postgres from "postgres";

declare global {
  var sql: ReturnType<typeof postgres> | undefined;
}

if (!process.env.POSTGRES_URL) {
  throw new Error(
    "POSTGRES_URL environment variable is required. Please set it in your .env.local file.",
  );
}

const sql =
  global.sql ??
  postgres(process.env.POSTGRES_URL, {
    ssl: process.env.NODE_ENV === "production" ? "require" : false,
    max: 10, // connection pool size
    idle_timeout: 20,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") global.sql = sql;

export default sql;

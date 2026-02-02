import { drizzle } from "drizzle-orm/d1";

export const getDb = (env: { todo_db: D1Database }) => {
  return drizzle(env.todo_db);
};

import { drizzle } from "drizzle-orm/d1";
import { todos } from "./schema";

export const getDb = (env: { todo_db?: D1Database }) => {
  if (!env.todo_db) return new Error("D1 database not found!");

  return drizzle(env.todo_db, { schema: { todos } });
};

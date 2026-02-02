import { sqliteTable } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  isDone:
});

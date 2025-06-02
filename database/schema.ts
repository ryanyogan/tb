import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestBook = sqliteTable("guestBook", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const ticket = sqliteTable("ticket", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: integer()
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer()
    .notNull()
    .$defaultFn(() => Date.now()),
  status: text().$type<TicketStatus>().notNull().default("OPEN"),
});

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export type Ticket = typeof ticket.$inferSelect;

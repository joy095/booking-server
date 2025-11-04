import {
  pgTable,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const service = pgTable("service", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  image: varchar("image", { length: 100 }),
  desc: varchar("desc", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  active: boolean("active").default(false),
});

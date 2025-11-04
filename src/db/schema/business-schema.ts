import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const business = pgTable("business", {
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

export const userRelations = relations(user, ({ one }) => ({
  invitee: one(user, {
    fields: [user.id],
    references: [user.id],
  }),
}));

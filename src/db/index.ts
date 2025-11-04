import * as authSchema from "./schema/auth-schema";
import * as businessSchema from "./schema/business-schema";
import { drizzle as bunDrizzle } from "drizzle-orm/bun-sql";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  schema: { ...authSchema, ...businessSchema },
});

export const bunDB = bunDrizzle({
  connection: process.env.DATABASE_URL!,
  schema: { ...authSchema, ...businessSchema },
});

// migrate.ts
import { migrate } from "drizzle-orm/bun-sql/migrator";
import { db } from "./src/db";

console.log("Starting migrations...");
await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Migrations completed!");
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(), // this will be the clerk user id
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  imageUrl: varchar("image_url").notNull(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(UserTable, ({ many }) => ({
  jobInfos: many(JobInfoTable),
}));

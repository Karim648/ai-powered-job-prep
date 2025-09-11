import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
 import { JobInfoTable } from "./jobInfo";

export const InterviewTable = pgTable("interviews", {
  id,
  jobInfoId: uuid("job_info_id")
    .notNull()
    .references(() => JobInfoTable.id, { onDelete: "cascade" }),
  duration: varchar().notNull(),
  humeChatId: varchar("hume_chat_id"),
  feedback: varchar(),
  createdAt,
  updatedAt,
});

// every interview is related to one job
export const interviewRelations = relations(InterviewTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [InterviewTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));

import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const questionDifficulties = ["easy", "medium", "hard"] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];
export const questionDifficultyEnum = pgEnum(
  "questions_question_difficulty",
  questionDifficulties,
);

export const QuestionTable = pgTable("questions", {
  id,
  jobInfoId: uuid("job_info_id")
    .notNull()
    .references(() => JobInfoTable.id, { onDelete: "cascade" }),
  text: varchar().notNull(), 
  difficulty: questionDifficultyEnum().notNull(),
  createdAt,
  updatedAt,
});

// every question is related to one job
export const questionRelations = relations(QuestionTable, ({ one }) => ({
  jobInfo: one(JobInfoTable, {
    fields: [QuestionTable.jobInfoId],
    references: [JobInfoTable.id],
  }),
}));

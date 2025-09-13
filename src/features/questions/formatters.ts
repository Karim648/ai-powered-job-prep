import { QuestionDifficulty } from "@/db/schema";

export function formatQuestionDifficulty(difficulty: QuestionDifficulty) {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    default:
      throw new Error(
        `Unknown question difficulty: ${difficulty satisfies never}`,
      );
  }
}

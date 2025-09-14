"use client";

import { BackLink } from "@/components/BackLink";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { formatQuestionDifficulty } from "@/features/questions/formatters";
import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { errorToast } from "@/lib/errorToast";
import {
  JobInfoTable,
  questionDifficulties,
  QuestionDifficulty,
} from "@/db/schema";

type Status = "awaiting-answer" | "awaiting-difficulty" | "init";

export function NewQuestionClientPage({
  jobInfo,
}: {
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title">;
}) {
  const [status, setStatus] = useState<Status>("init");
  const [answer, setAnswer] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Fetch latest question (id + text) from DB after generation
  const fetchLatestQuestion = async () => {
    try {
      const response = await fetch("/api/ai/questions/latest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobInfoId: jobInfo.id }),
      });

      if (!response.ok) throw new Error("Failed to fetch question");

      const data = await response.json();
      setQuestionId(data.questionId);
      setQuestion(data.questionText); // ✅ ensure UI matches DB
    } catch (error) {
      console.error("Error fetching question:", error);
      errorToast("Failed to fetch latest question");
    }
  };

  const {
    complete: generateQuestion,
    completion: questionCompletion,
    isLoading: isGeneratingQuestion,
  } = useCompletion({
    api: "/api/ai/questions/generate-question",
    onFinish: async (completion) => {
      setQuestion(completion); // Set the streamed question text
      await fetchLatestQuestion(); // pull stored question id
      setStatus("awaiting-answer");
    },
    onError: (error) => {
      console.error("Question generation error:", error);
      errorToast(error.message);
    },
  });

  const {
    complete: generateFeedback,
    completion: feedbackCompletion,
    isLoading: isGeneratingFeedback,
  } = useCompletion({
    api: "/api/ai/questions/generate-feedback",
    onFinish: async (completion) => {
      setFeedback(completion); // Set the streamed feedback text
      setStatus("awaiting-difficulty");
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });

  // ✅ reset state properly
  const reset = () => {
    setStatus("init");
    setQuestion(null);
    setFeedback(null);
    setAnswer(null);
    setQuestionId(null);
  };

  return (
    <div className="mx-w-[2000px] h-screen-header mx-auto flex w-full flex-grow flex-col items-center gap-4">
      <div className="container mt-4 flex items-center justify-between gap-4">
        <div className="flex-grow basis-0">
          <BackLink href={`/app/job-infos/${jobInfo.id}`}>
            {jobInfo.name}
          </BackLink>
        </div>
        <Controls
          reset={reset}
          disableAnswerButton={
            answer == null || answer.trim() === "" || questionId == null
          }
          status={status}
          isLoading={isGeneratingFeedback || isGeneratingQuestion}
          generateFeedback={() => {
            if (answer == null || answer.trim() === "" || questionId == null)
              return;

            generateFeedback(answer.trim(), { body: { questionId } });
          }}
          generateQuestion={(difficulty) => {
            reset();
            generateQuestion(difficulty, { body: { jobInfoId: jobInfo.id } });
          }}
        />
        <div className="hidden flex-grow md:block" />
      </div>
      <QuestionContainer
        question={question || questionCompletion}
        feedback={feedback || feedbackCompletion}
        answer={answer}
        status={status}
        setAnswer={setAnswer}
      />
    </div>
  );
}

function QuestionContainer({
  question,
  feedback,
  answer,
  status,
  setAnswer,
}: {
  question: string | null;
  feedback: string | null;
  answer: string | null;
  status: Status;
  setAnswer: (value: string) => void;
}) {
  console.log(
    "QuestionContainer render - question:",
    question,
    "status:",
    status,
  );
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
      <ResizablePanel id="question-and-feedback" defaultSize={50} minSize={5}>
        <ResizablePanelGroup direction="vertical" className="flex-grow">
          <ResizablePanel id="question" defaultSize={25} minSize={5}>
            <ScrollArea className="h-full min-w-48 *:h-full">
              {status === "init" && question == null ? (
                <p className="flex h-full items-center justify-center p-6 text-base md:text-lg">
                  Get started by selecting a question difficulty above.
                </p>
              ) : (
                question && (
                  <MarkdownRenderer className="p-6">
                    {question}
                  </MarkdownRenderer>
                )
              )}
            </ScrollArea>
          </ResizablePanel>
          {feedback && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel id="feedback" defaultSize={75} minSize={5}>
                <ScrollArea className="h-full min-w-48 *:h-full">
                  <MarkdownRenderer className="p-6">
                    {feedback}
                  </MarkdownRenderer>
                </ScrollArea>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="answer" defaultSize={50} minSize={5}>
        <ScrollArea className="h-full min-w-48 *:h-full">
          <Textarea
            disabled={status !== "awaiting-answer"}
            onChange={(e) => setAnswer(e.target.value)}
            value={answer ?? ""}
            placeholder="Type your answer here..."
            className="h-full w-full resize-none rounded-none border-none p-6 !text-base focus-visible:ring focus-visible:ring-inset"
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function Controls({
  status,
  isLoading,
  disableAnswerButton,
  generateQuestion,
  generateFeedback,
  reset,
}: {
  disableAnswerButton: boolean;
  status: Status;
  isLoading: boolean;
  generateQuestion: (difficulty: QuestionDifficulty) => void;
  generateFeedback: () => void;
  reset: () => void;
}) {
  return (
    <div className="flex gap-2">
      {status === "awaiting-answer" ? (
        <>
          <Button
            onClick={reset}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <LoadingSwap isLoading={isLoading}>Skip</LoadingSwap>
          </Button>
          <Button
            onClick={generateFeedback}
            disabled={disableAnswerButton}
            size="sm"
          >
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      ) : (
        questionDifficulties.map((difficulty) => (
          <Button
            key={difficulty}
            size="sm"
            disabled={isLoading}
            onClick={() => generateQuestion(difficulty)}
          >
            <LoadingSwap isLoading={isLoading}>
              {formatQuestionDifficulty(difficulty)}
            </LoadingSwap>
          </Button>
        ))
      )}
    </div>
  );
}

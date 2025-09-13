import { JobInfoBackLink } from "@/components/JobInfoBackLink";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { InterviewTable } from "@/db/schema";
import { getInterviewJobInfoTag } from "@/features/interviews/dbCache";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { formatDateTime } from "@/lib/formatters";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <div className="h-screen-header container flex flex-col items-start gap-4 py-4">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <Suspense
        fallback={<Loader2Icon className="m-auto size-24 animate-spin" />}
      >
        <SuspendedPage jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser({});
  if (userId == null) return redirectToSignIn();

  const interviews = await getInterviews(jobInfoId, userId);
  if (interviews.length === 0) {
    return redirect(`/app/job-infos/${jobInfoId}/interviews/new`);
  }
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Interviews</h1>
        <Button asChild>
          <Link href={`/app/job-infos/${jobInfoId}/interviews/new`}>
            <PlusIcon />
            New Interview
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 has-hover:*:not-hover:opacity-70 lg:grid-cols-2">
        <Link
          className="transition-opacity"
          href={`/app/job-infos/${jobInfoId}/interviews/new`}
        >
          <Card className="hover:border-primary/50 flex h-full items-center justify-center border-3 border-dashed bg-transparent shadow-none transition-colors">
            <div className="flex items-center gap-2 text-lg">
              <PlusIcon className="size-6" />
              New Interview
            </div>
          </Card>
        </Link>
        {interviews.map((interview) => (
          <Link
            className="transition-[transform_opacity] hover:scale-[1.02]"
            href={`/app/job-infos/${jobInfoId}/interviews/${interview.id}`}
            key={interview.id}
          >
            <Card className="h-full">
              <div className="flex h-full items-center justify-between">
                <CardHeader className="flex-grow gap-1">
                  <CardTitle className="text-lg">
                    {formatDateTime(interview.createdAt)}
                  </CardTitle>
                  <CardDescription>{interview.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function getInterviews(jobInfoId: string, userId: string) {
  "use cache";
  cacheTag(getInterviewJobInfoTag(jobInfoId));
  cacheTag(getJobInfoIdTag(jobInfoId));

  const data = await db.query.InterviewTable.findMany({
    where: and(
      eq(InterviewTable.jobInfoId, jobInfoId),
      isNotNull(InterviewTable.humeChatId),
    ),
    with: { jobInfo: { columns: { userId: true } } },
    orderBy: desc(InterviewTable.updatedAt),
  });

  return data.filter((interview) => interview.jobInfo.userId === userId);
}

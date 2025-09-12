import BackLink from "@/components/BackLink";
import { Skeleton } from "@/components/Skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { db } from "@/db";
import { JobInfoTable } from "@/db/schema";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { and, eq } from "drizzle-orm";
import { ArrowRightIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const options = [
  {
    label: "Answer Technical Questions",
    description:
      "Challenge yourself with practice questions tailored to your job description.",
    href: "questions",
  },
  {
    label: "Practice Interviewing",
    description: "Simulate a real interview with AI-powered mock interviews.",
    href: "interviews",
  },
  {
    label: "Refine Your Resume",
    description:
      "Get expert feedback on your resume and improve your chances of landing an interview.",
    href: "resume",
  },
  {
    label: "Update Job Description",
    description: "This should only be used for minor updates.",
    href: "edit",
  },
];

export default async function JobInfoPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  const { userId, redirectToSignIn } = await getCurrentUser({});
  if (userId == null) return redirectToSignIn();

  const jobInfo = await getJobInfo(jobInfoId, userId);

  if (jobInfo == null) return notFound();

  return (
    <div className="container my-4 space-y-4">
      <BackLink href="/app">Dashboard</BackLink>
      <div className="space-y-6">
        <Suspense fallback={<Skeleton />}>
          <header className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl">{jobInfo?.name}</h1>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {formatExperienceLevel(jobInfo.experienceLevel)}
                </Badge>
                {jobInfo.title && (
                  <Badge variant="secondary">{jobInfo.title}</Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-3">
              {jobInfo?.description}
            </p>
          </header>
        </Suspense>

        <div className="grid grid-cols-1 gap-6 has-hover:*:not-hover:opacity-70 lg:grid-cols-2">
          {options.map((option) => (
            <Link
              className="transition-[transform_opacity] hover:scale-[1.02]"
              key={option.href}
              href={`/app/job-infos/${jobInfoId}/${option.href}`}
            >
              <Card className="flex h-full flex-row items-start justify-between">
                <CardHeader className="flex-grow">
                  <CardTitle>{option.label}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

async function getJobInfo(id: string, userId: string) {
  "use cache";

  cacheTag(getJobInfoIdTag(id));

  return await db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  });
}

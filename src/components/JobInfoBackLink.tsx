import { cn } from "@/lib/utils";
import BackLink from "./BackLink";
import { Suspense } from "react";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { JobInfoTable } from "@/db/schema";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";

export function JobInfoBackLink({
  jobInfoId,
  className,
}: {
  jobInfoId: string;
  className?: string;
}) {
  return (
    <BackLink
      href={`/app/job-infos/${jobInfoId}`}
      className={cn("mb-4", className)}
    >
      <Suspense fallback="Job Description">
        <JobName jobInfoId={jobInfoId} />
      </Suspense>
    </BackLink>
  );
}

async function JobName({ jobInfoId }: { jobInfoId: string }) {
  const jobInfo = await getJobInfo(jobInfoId);
  return jobInfo?.name ?? "Job Description";
}

async function getJobInfo(id: string) {
  "use cache";

  cacheTag(getJobInfoIdTag(id));

  return await db.query.JobInfoTable.findFirst({
    where: eq(JobInfoTable.id, id),
  });
}

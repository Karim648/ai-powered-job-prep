import { db } from "@/db"
import { QuestionTable } from "@/db/schema"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { desc, eq } from "drizzle-orm"
import z from "zod"

const schema = z.object({
  jobInfoId: z.string().min(1),
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return new Response("Invalid request", { status: 400 })
  }

  const { jobInfoId } = result.data
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return new Response("You are not logged in", { status: 401 })
  }

  // Get the latest question for this job info and user
  const latestQuestion = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: desc(QuestionTable.createdAt),
    columns: {
      id: true,
      text: true,
      createdAt: true,
    },
    with: {
      jobInfo: {
        columns: {
          userId: true,
        },
      },
    },
  })

  if (!latestQuestion) {
    return new Response("No questions found", { status: 404 })
  }

  // Verify the user owns this job info
  if (latestQuestion.jobInfo.userId !== userId) {
    return new Response("You do not have permission to access this", { status: 403 })
  }

  return Response.json({ 
    questionId: latestQuestion.id, 
    questionText: latestQuestion.text 
  })
}
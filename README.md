# AI-Powered Job Prep

AI-Powered Job Prep is a full-stack web application that helps job seekers prepare for interviews and improve their resumes using AI. It combines mock interviews, tailored resume suggestions, and programming/technical practice questions into a single platform designed to give candidates a competitive edge.

This project showcases end-to-end product development skills — from database design and authentication to AI integration, streaming APIs, and responsive front-end design.

## Overview

Interview prep is time-consuming and unstructured for many candidates. This project solves that problem by combining user-supplied job information with AI to produce targeted practice questions, then storing sessions and offering automated feedback so users can iterate and improve over time.

This repo demonstrates full-stack skills: a production-ready Next.js app (App Router) with server and client components, a type-safe database layer with Drizzle ORM and Postgres, third-party auth with Clerk, and AI-streaming integrations for a responsive UX.

## Key Features

- Speak with an AI in a mock interview environment.
- Receive real-time feedback on your answers.
- Upload your resume directly into the app.
- AI analyzes and suggests ATS-friendly improvements.
- Get recruiter-approved changes to maximize your chances of landing interviews.
- Upload a job posting or enter details manually.
- AI generates programming and technical questions tailored to the role.
- Questions come with hints and structured feedback for iterative practice.

## Tech Stack

- Frontend: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons
- Backend: Node.js APIs, AI SDK (Google/OpenAI) with streaming support
- Database: PostgreSQL + Drizzle ORM (type-safe schema and migrations)
- Authentication: Clerk (secure, production-ready auth)
- Other: Markdown rendering, resizable panels, streaming UX

## Why these technologies

- Next.js offers hybrid server/client rendering for fast initial loads and secure server-side logic. I used server components for sensitive logic (DB, auth) and client components for interactive UI.
- Drizzle ORM provides type-safe queries which improved developer confidence and reduced runtime errors.
- Clerk simplified authentication, allowing quick, secure user flows without building auth from scratch.
- The AI SDK's streaming capabilities enabled a responsive, real-time UI for content generation.

## Installation (macOS / Linux)

1. Clone the repo

```bash
git clone https://github.com/<your-username>/ai-powered-job-prep.git
cd ai-powered-job-prep
```

2. Install dependencies (pnpm recommended)

```bash
pnpm install
```

3. Create a `.env` file in the project root with the required variables:

```env
DATABASE_URL=postgres://user:password@localhost:5432/dbname
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_API_KEY=sk_xxx
AI_API_KEY=xxx
```

4. Set up the database (use Docker or local Postgres). Then run Drizzle migrations or push the schema:

```bash
pnpm db:push
# or
pnpm db:migrate
```

5. Start the dev server

```bash
pnpm dev
```

6. Open `http://localhost:3000` (or the port Next reports) in your browser.

## Usage

- Add a "Job Info" entry with role, company, and description.
- Open the Job's Questions page and select a difficulty to generate a tailored question.
- Type your answer in the right panel and request AI feedback.
- Revisit previous questions from the DB for repeated practice.

## API highlights

- `POST /api/ai/questions/generate-question` — streams a generated question and persists it.
- `POST /api/ai/questions/generate-feedback` — streams feedback for a provided question and answer.
- `POST /api/ai/questions/latest` — returns the latest saved question for a job (id and text).

## Example: Local workflow

1. Create job info: `/app/job-infos/new`
2. Navigate to `/app/job-infos/[jobId]/questions`
3. Click a difficulty to generate. The question streams in, is saved, and appears in the left panel.
4. Add an answer and request feedback.

## Challenges & Solutions

- Problem: Generated text was persisted but not visible in the UI. I traced the issue to the `latest` API that only returned an ID. I updated the query to include the `text` column and adjusted the client to use streamed completions while falling back to persisted data.

## Future Improvements

- Session history and answer replay with timestamps.
- Analytics dashboard to surface common weaknesses and targeted study plans.
- Model selection and prompt customization per user.
- Add end-to-end tests and CI/CD for deployments.

## Live Demo

Add your deployed URL here (e.g. `https://your-app.example.com`) to make it easy for employers to try.

## Contact

- LinkedIn: https://www.linkedin.com/in/karim-youssef-1347b324a/
- Portfolio: https://your-portfolio.example.com
- Email: Karimm.youssef05@gmail.com

---

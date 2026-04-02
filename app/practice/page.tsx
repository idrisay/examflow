import Link from "next/link";

import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { sampleExams, sampleQuestions } from "@/lib/sample-data";
import { Attempt } from "@/models/Attempt";
import { Exam } from "@/models/Exam";
import { Question } from "@/models/Question";
import { PracticeClient } from "@/components/practice-client";

type PracticePageProps = {
  searchParams: Promise<{ exam?: string }>;
};

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const session = await getSession();
  const { exam: examSlug } = await searchParams;

  let selectedExam = sampleExams[0];
  let questions = sampleQuestions
    .filter((item) => item.examSlug === selectedExam.slug)
    .map((question, index) => ({
      _id: `${selectedExam.slug}-${index}`,
      ...question
    }));
  let attempts: Array<{ score: number; createdAt: string }> = [];

  try {
    await connectToDatabase();

    if (examSlug) {
      const dbExam = await Exam.findOne({ slug: examSlug }).lean();
      if (dbExam) {
        selectedExam = {
          title: dbExam.title,
          slug: dbExam.slug,
          provider: dbExam.provider,
          level: dbExam.level,
          category: dbExam.category,
          durationMinutes: dbExam.durationMinutes,
          description: dbExam.description,
          isPremium: dbExam.isPremium,
          questionCount: dbExam.questionCount
        };
      }
    }

    const dbQuestions = await Question.find({ examSlug: selectedExam.slug }).lean();
    if (dbQuestions.length > 0) {
      questions = dbQuestions.map((question) => ({
        _id: String(question._id),
        prompt: question.prompt,
        type: question.type,
        options: question.options || [],
        answer: question.answer,
        explanation: question.explanation,
        examSlug: question.examSlug
      }));
    }

    if (session) {
      attempts = await Attempt.find({ userId: session.userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .then((rows) =>
          rows.map((row) => ({
            score: row.score,
            createdAt: new Date(row.createdAt).toLocaleDateString()
          }))
        );
    }
  } catch {
    attempts = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      {session ? (
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <PracticeClient
            examId={selectedExam.slug}
            title={selectedExam.title}
            questions={questions}
          />

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
                Your dashboard
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Recent progress
              </h2>
              <div className="mt-5 space-y-3">
                {attempts.length > 0 ? (
                  attempts.map((attempt, index) => (
                    <div
                      key={`${attempt.createdAt}-${index}`}
                      className="rounded-2xl border border-white/10 px-4 py-3"
                    >
                      <p className="text-sm text-white">{attempt.score}% score</p>
                      <p className="text-xs text-slate-400">{attempt.createdAt}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-300">
                    No saved attempts yet. Finish one practice set to start.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
            Practice access
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            Practice is better with an account
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Visitors can view public exam questions, but login lets you save scores,
            compare results, and build a personal exam routine.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Create free account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
